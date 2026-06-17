"""
Archive original raster images (PNG/JPG) that now have a .webp replacement.

- Scans public/projet and public/profile.
- For each .png/.jpg/.jpeg that has a sibling .webp, adds it to image-originals.zip
  (preserving the path relative to public/), then deletes the original.
- WebP files and anything without a webp twin are left untouched.
"""
import os
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
DIRS = [PUBLIC / "projet", PUBLIC / "profile"]
SRC_EXT = {".png", ".jpg", ".jpeg"}
ZIP_PATH = ROOT / "image-originals.zip"

to_archive = []
for d in DIRS:
    if not d.exists():
        continue
    for f in d.iterdir():
        if f.is_file() and f.suffix.lower() in SRC_EXT:
            if f.with_suffix(".webp").exists():
                to_archive.append(f)

if not to_archive:
    print("Nothing to archive (no originals with a .webp twin).")
    raise SystemExit(0)

before = sum(f.stat().st_size for f in to_archive)

with zipfile.ZipFile(ZIP_PATH, "w", compression=zipfile.ZIP_DEFLATED) as z:
    for f in to_archive:
        arcname = f.relative_to(PUBLIC).as_posix()  # e.g. projet/Mockup.png
        z.write(f, arcname)

# Only delete after the zip is fully written and closed.
removed = 0
for f in to_archive:
    f.unlink()
    removed += 1

zip_size = ZIP_PATH.stat().st_size
print(f"Archived {removed} originals: {before/1024/1024:.2f} MB")
print(f"Zip: image-originals.zip ({zip_size/1024/1024:.2f} MB)")
print("Originals removed from public/. WebP versions kept.")
