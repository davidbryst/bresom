"""Append Affinity (.af) source files from public/ into image-originals.zip, then
remove them from public/. They are working files that should not be deployed."""
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ZIP_PATH = ROOT / "image-originals.zip"

af_files = sorted(PUBLIC.rglob("*.af"))
if not af_files:
    print("No .af files found under public/.")
    raise SystemExit(0)

before = sum(f.stat().st_size for f in af_files)
mode = "a" if ZIP_PATH.exists() else "w"
with zipfile.ZipFile(ZIP_PATH, mode, compression=zipfile.ZIP_DEFLATED) as z:
    for f in af_files:
        z.write(f, f.relative_to(PUBLIC).as_posix())

for f in af_files:
    f.unlink()

print(f"Archived + removed {len(af_files)} .af source files: {before/1024/1024:.2f} MB")
print(f"Zip now: image-originals.zip ({ZIP_PATH.stat().st_size/1024/1024:.2f} MB)")
