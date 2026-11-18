"""Run on the Mac with the configured whiteboard skill and authenticated gh."""
import datetime as dt
import fcntl
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent
REPO = "leisure3318/agents-radar"
SKILL = Path.home() / ".codex/skills/whiteboard-book-reader"
OUTPUT = Path.home() / "Movies/Agents Radar 白板"
WB = SKILL / "bin/wb"
os.environ["WHITEBOARD_SKILL"] = str(SKILL)

def run(*args):
    return subprocess.check_output(args, text=True, timeout=45).strip()

def artifacts():
    rows = json.loads(run("gh", "api", f"repos/{REPO}/actions/artifacts?per_page=100"))["artifacts"]
    return {row["name"][11:]: row["workflow_run"]["id"] for row in rows
            if row["name"].startswith("whiteboard-") and not row["expired"] and row.get("workflow_run")}

def render(day, run_id):
    dest = OUTPUT / day
    if (dest / "日报白板.mp4").is_file():
        return dest
    with tempfile.TemporaryDirectory() as temp:
        incoming = Path(temp)
        subprocess.run(["gh", "run", "download", str(run_id), "-R", REPO,
                        "-n", f"whiteboard-{day}", "-D", temp], check=True, timeout=120)
        plan = json.loads((incoming / "storyboard.json").read_text())
        if plan["date"] != day:
            raise ValueError("Mismatched storyboard date")
        project = SKILL / "episodes" / f"{day} 自动 AI 情报白板"
        project.mkdir(exist_ok=True)
        shutil.copy2(ROOT / "whiteboard-scenes.cjs", project / "scenes.js")
        shutil.copy2(incoming / "storyboard.json", project)
    subprocess.run([str(WB), "build", str(project)], check=True, timeout=1500)
    video = SKILL / "build" / project.name / "outputs/final.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-xerror", "-i", str(video), "-f", "null", "-"],
                   check=True, timeout=120)
    with tempfile.TemporaryDirectory(dir=OUTPUT) as staging:
        stage = Path(staging) / day
        stage.mkdir()
        shutil.copy2(video, stage / "日报白板.mp4")
        for name in ("字幕.srt", "旁白稿.md", "封面-视频号-4x3.png", "storyboard.json"):
            shutil.copy2(project / name, stage)
        sources = "\n".join(f"- {s['title']} · {s['source']}" for s in plan["stories"])
        (stage / "审看.md").write_text(f"# {plan['date']} {plan['title']}\n\n{sources}\n\n自动生成，等待人工审看。\n")
        stage.rename(dest)
    return dest

def notify(day, dest):
    sent = dest / ".bark-confirmed"
    if sent.exists():
        return
    runs = json.loads(run("gh", "run", "list", "-R", REPO, "-w", "whiteboard-bark.yml",
                          "-e", "repository_dispatch", "-L", "30",
                          "--json", "displayTitle,status,conclusion,databaseId"))
    existing = next((row for row in runs if row["displayTitle"] == f"Whiteboard ready · {day}"), None)
    if existing and existing["conclusion"] == "success":
        sent.touch()
    elif existing and existing["status"] == "completed":
        subprocess.run(["gh", "run", "rerun", str(existing["databaseId"]), "-R", REPO, "--failed"],
                       check=True, timeout=45)
    elif existing is None:
        pending = dest / ".bark-requested"
        if pending.exists() and dt.datetime.now().timestamp() - pending.stat().st_mtime < 3600:
            return
        payload = json.dumps({"event_type": "whiteboard-ready", "client_payload": {"date": day}})
        subprocess.run(["gh", "api", f"repos/{REPO}/dispatches", "--input", "-"], input=payload,
                       text=True, check=True, timeout=45)
        pending.touch()

def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    today = dt.datetime.now(ZoneInfo("Asia/Shanghai")).date()
    dates = [dt.date.fromisoformat(sys.argv[1])] if len(sys.argv) > 1 else [
        today - dt.timedelta(days=offset) for offset in range(3)]
    with (OUTPUT / ".run.lock").open("a") as lock:
        try:
            fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        except BlockingIOError:
            return
        available = artifacts()
        for date in dates:
            day = date.isoformat()
            dest = OUTPUT / day
            if day in available and not (dest / "日报白板.mp4").exists():
                print(f"Rendering {day}", flush=True)
                dest = render(day, available[day])
            if (dest / "日报白板.mp4").exists():
                notify(day, dest)

if __name__ == "__main__":
    main()
