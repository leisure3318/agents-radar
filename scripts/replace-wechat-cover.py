import re
import tempfile
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

snapshot = Snapshot(original["content"])
assert title.startswith("Codex") and snapshot.images
with tempfile.TemporaryDirectory() as folder:
    photo = Path(folder) / "codex.jpg"
    daily["jpeg"](Path("codex-splash.png").read_bytes(), photo)
    boundary = "photo-" + os.urandom(12).hex()
    header = f'--{boundary}\r\nContent-Disposition: form-data; name="media"; filename="codex.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'
    body = header.encode() + photo.read_bytes() + f"\r\n--{boundary}--\r\n".encode()
    new_image = api("media/uploadimg", body, f"multipart/form-data; boundary={boundary}")["url"]

editable = ("article_type", "title", "author", "digest", "content", "thumb_media_id",
            "content_source_url", "show_cover_pic", "need_open_comment", "only_fans_can_comment")
entry = {key: original[key] for key in editable if key in original}
first_tag = re.search(r"<img\b[^>]*>", original["content"], re.I)
assert first_tag and snapshot.images[0] in first_tag[0]
entry["content"] = (original["content"][:first_tag.start()]
                    + first_tag[0].replace(snapshot.images[0], new_image)
                    + original["content"][first_tag.end():])
latest = api("draft/get", {"media_id": media_id})["news_item"][index]
assert all(latest.get(key) == original.get(key) for key in editable)
api("draft/update", {"media_id": media_id, "index": index, "articles": entry})
saved = api("draft/get", {"media_id": media_id})["news_item"][index]
after = Snapshot(saved["content"])
def image_identity(url):
    return url.removeprefix("https://").removeprefix("http://")

assert image_identity(after.images[0]) == image_identity(new_image)
assert list(map(image_identity, after.images[1:])) == list(map(image_identity, snapshot.images[1:]))
assert after.text == snapshot.text
assert [tag for tag, _ in after.tags] == [tag for tag, _ in snapshot.tags]
assert saved["thumb_media_id"] == original["thumb_media_id"]
print(f"Verified {title}: first image is the Codex README screenshot; cover, text, guide and remaining images match")
