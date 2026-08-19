#!/usr/bin/env python3
"""
Refresh real course images for Vietnam Golf Guide from wingolf.com.vn.

Fetches the OpenGraph image of each course page (wingolf.com.vn/san-golf/<alias>)
and stores a resized webp in assets/images/courses/<alias>.webp.
Only downloads files that are missing unless --force is passed.

Usage:
    python3 scripts/fetch-images.py            # fetch missing images
    python3 scripts/fetch-images.py --force    # re-fetch all images
"""
import os
import re
import subprocess
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "images", "courses")
DATA = os.path.join(ROOT, "_data", "golf-courses.yml")


def aliases():
    text = open(DATA, encoding="utf-8").read()
    return re.findall(r"^- alias: (\S+)", text, re.M)


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    return urllib.request.urlopen(req, timeout=30).read()


def og_image(slug):
    try:
        html = fetch(f"https://wingolf.com.vn/san-golf/{slug}").decode("utf-8", "ignore")
    except Exception:
        return None
    m = re.search(r'<meta property="og:image" content="([^"]+)"', html)
    if m:
        return m.group(1)
    imgs = sorted(set(re.findall(
        r"https://wingolf\.com\.vn/upload/images/[^\"' ]+\.(?:webp|jpg|jpeg|png)", html)))
    return imgs[0] if imgs else None


def main():
    force = "--force" in sys.argv
    os.makedirs(OUT, exist_ok=True)
    ok = missing = failed = 0
    for alias in aliases():
        dst = os.path.join(OUT, f"{alias}.webp")
        if os.path.exists(dst) and not force:
            ok += 1
            print(f"skip   {alias} (exists)")
            continue
        url = og_image(alias)
        if not url:
            missing += 1
            print(f"MISS   {alias} (no image on wingolf)")
            continue
        try:
            tmp = f"{OUT}/.{alias}.tmp"
            open(tmp, "wb").write(fetch(url))
            subprocess.run(
                ["magick", tmp, "-resize", "1100x700>", "-quality", "82", dst],
                check=True, capture_output=True)
            os.remove(tmp)
            ok += 1
            print(f"OK     {alias} ({os.path.getsize(dst) // 1024}KB)")
        except Exception as e:
            failed += 1
            print(f"FAIL   {alias} ({e})")
    print(f"\nDone — {ok} ok, {missing} no image, {failed} failed")


if __name__ == "__main__":
    main()