import hashlib
import os
from pathlib import Path
import runpy
from urllib.parse import quote

request = runpy.run_path("scripts/wechat-daily.py")["request"]
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
editable = ("article_type", "title", "author", "digest", "content",
            "content_source_url", "show_cover_pic", "need_open_comment", "only_fans_can_comment")
entry = {field: original[field] for field in editable if field in original}
cover = Path("cover-source/cover.jpg").read_bytes()
boundary = "cover-" + os.urandom(12).hex()
header = f'--{boundary}\r\nContent-Disposition: form-data; name="media"; filename="cover.jpg"\r\nContent-Type: image/jpeg\r\n\r\n'
media = api("material/add_material?type=image", header.encode() + cover + f"\r\n--{boundary}--\r\n".encode(),
            f"multipart/form-data; boundary={boundary}")
entry["thumb_media_id"] = media["media_id"]

def comparable(article):
    return {key: value for key, value in article.items() if key not in {"url", "thumb_url"}}


current = api("draft/get", {"media_id": media_id})["news_item"]
if len(current) != len(before):
    raise RuntimeError("Draft article count changed before update")
for first, second in zip(before, current):
    left, right = comparable(first), comparable(second)
    changed = sorted(key for key in left.keys() | right.keys() if left.get(key) != right.get(key))
    if changed:
        raise RuntimeError(f"Draft fields changed before update: {changed}")
api("draft/update", {"media_id": media_id, "index": index, "articles": entry})
after = api("draft/get", {"media_id": media_id})["news_item"]
assert len(after) == len(before)
assert after[index]["thumb_media_id"] == media["media_id"]
assert all(after[index].get(field) == original.get(field) for field in editable)
assert all(comparable(a) == comparable(b) for i, (a, b) in enumerate(zip(before, after)) if i != index)
print(f"Verified cover replacement for {title}")
print("Verified exact equality of the existing body, numbered guide and editable metadata")
print(f"Cover SHA-256 {hashlib.sha256(cover).hexdigest()}")
