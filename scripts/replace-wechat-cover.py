import json
from html.parser import HTMLParser
import os
from pathlib import Path
import runpy
from urllib.parse import quote

daily = runpy.run_path("scripts/wechat-daily.py")
request = daily["request"]
origin = "https://api.weixin.qq.com/cgi-bin/"
token = request(origin + "stable_token", {
    "grant_type": "client_credential",
    "appid": os.environ["WECHAT_APP_ID"],
    "secret": os.environ["WECHAT_APP_SECRET"],
}, wechat_tunnel=True)["access_token"]


def api(path, payload, mime="application/json"):
    separator = "&" if "?" in path else "?"
    return request(origin + path + separator + "access_token=" + quote(token),
                   payload, content_type=mime, wechat_tunnel=True)


day = "2026-11-18"
matches = []
offset = 0
while True:
    page = api("draft/batchget", {"offset": offset, "count": 20, "no_content": 0})
    items = page.get("item", [])
    for draft in items:
        for index, article in enumerate(draft["content"]["news_item"]):
            title = article["title"]
            if title.endswith("｜" + day) or title.startswith("AI 雷达 " + day + "｜"):
                matches.append((draft["media_id"], index, title))
    offset += len(items)
    if not items or offset >= page["total_count"]:
        break
if len(matches) != 1:
    raise RuntimeError(f"Expected exactly one draft article for {day}, found {len(matches)}")

media_id, index, title = matches[0]
before = api("draft/get", {"media_id": media_id})["news_item"]
original = before[index]
if original["title"] != title or "今日导读" not in original["content"]:
    raise RuntimeError("Draft changed or does not have the expected guide")
class Snapshot(HTMLParser):
    def __init__(self, content):
        super().__init__()
        self.text = []
        self.tags = []
        self.images = []
        self.feed(content)
        self.close()

    def handle_data(self, data):
        if data.strip():
            self.text.append(" ".join(data.split()))

    def handle_starttag(self, tag, attrs):
        if tag == "img":
            attributes = dict(attrs)
            self.images.append(attributes.get("data-src") or attributes.get("src") or "")
        self.tags.append((tag, dict(attrs)))

baseline = json.loads(Path("original-draft/article.json").read_text())
sources = [
    item["image"]
    for section in baseline["sections"]
    for item in section["items"]
    if item.get("image")
]
actual = Snapshot(original["content"])
assert len(actual.images) == len(sources), (len(actual.images), len(sources))
assert len(set(actual.images)) == len(actual.images)
assert all(url.startswith("https://mmbiz.qpic.cn/") or url.startswith("http://mmbiz.qpic.cn/") for url in actual.images)
expected = Snapshot(daily["render"](baseline, dict(zip(sources, actual.images))))
assert original["title"] == baseline["title"]
assert expected.text == actual.text, (len(expected.text), len(actual.text))
assert [tag for tag, _ in expected.tags] == [tag for tag, _ in actual.tags]
assert expected.images == actual.images
assert "今日导读" in actual.text
print(f"Verified {title}")
print(f"Verified all article text, the numbered guide, HTML element order and {len(actual.images)} inline photos against the original publishing artifact")
if expected.tags != actual.tags:
    print("WeChat read-back HTML attributes differ from original upload HTML")
