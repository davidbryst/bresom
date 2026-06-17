/**
 * Image optimization script.
 *
 * Converts large PNG/JPG assets in public/ to resized WebP files alongside the
 * originals (same name, .webp extension). Originals are left untouched so you
 * can revert or delete them once you've confirmed the WebP versions look good.
 *
 * Usage:
 *   node scripts/optimize-images.mjs            # convert default folders
 *   node scripts/optimize-images.mjs public/projet 1200 80
 *
 * Args (optional): <dir> <maxWidth> <quality>
 */
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";

// Folders to optimize and their target max width (px). WebP quality is global.
const TARGETS = [
  { dir: "public/projet", maxWidth: 1200 }, // project mockups (the heavy ones)
  { dir: "public/profile", maxWidth: 1400 }, // identity / hero photos
];
let QUALITY = 80;
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);

function fmt(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

async function optimizeFile(path, maxWidth) {
  const ext = extname(path).toLowerCase();
  if (!SOURCE_EXT.has(ext)) return null;

  const outPath = join(dirname(path), basename(path, ext) + ".webp");
  const before = (await stat(path)).size;

  const img = sharp(path);
  const meta = await img.metadata();
  const pipeline =
    meta.width && meta.width > maxWidth
      ? img.resize({ width: maxWidth, withoutEnlargement: true })
      : img;

  await pipeline.webp({ quality: QUALITY, effort: 5 }).toFile(outPath);

  const after = (await stat(outPath)).size;
  return { name: basename(path), before, after, outPath };
}

async function run() {
  const [argDir, argWidth, argQuality] = process.argv.slice(2);
  if (argQuality) QUALITY = Number(argQuality) || QUALITY;
  const targets = argDir
    ? [{ dir: argDir, maxWidth: Number(argWidth) || 1200 }]
    : TARGETS;

  let totalBefore = 0;
  let totalAfter = 0;
  const rows = [];

  for (const { dir, maxWidth } of targets) {
    let entries;
    try {
      entries = await readdir(dir);
    } catch {
      console.warn(`skip ${dir} (not found)`);
      continue;
    }
    for (const entry of entries) {
      const path = join(dir, entry);
      const s = await stat(path);
      if (!s.isFile()) continue;
      const res = await optimizeFile(path, maxWidth);
      if (!res) continue;
      totalBefore += res.before;
      totalAfter += res.after;
      rows.push(res);
    }
  }

  rows.sort((a, b) => b.before - a.before);
  for (const r of rows) {
    const saved = (100 * (1 - r.after / r.before)).toFixed(0);
    console.log(
      `${r.name.padEnd(34)} ${fmt(r.before).padStart(9)} -> ${fmt(
        r.after
      ).padStart(9)}  (-${saved}%)`
    );
  }
  console.log("-".repeat(70));
  console.log(
    `TOTAL ${rows.length} files: ${fmt(totalBefore)} -> ${fmt(totalAfter)} ` +
      `(-${(100 * (1 - totalAfter / totalBefore)).toFixed(0)}%)`
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
