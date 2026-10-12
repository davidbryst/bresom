/**
 * Writes app/data/imageSizes.json: { "/<slug>/<file>.webp": [width, height] }
 * for every image in public/projet, so <img> tags can declare their size
 * (prevents layout shift). Re-run after adding or replacing project images:
 *   node scripts/image-sizes.mjs
 */
import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const ROOT = "public/projet";
const sizes = {};
for (const slug of (await readdir(ROOT, { withFileTypes: true })).filter((d) => d.isDirectory())) {
  for (const file of await readdir(join(ROOT, slug.name))) {
    if (!/\.(webp|png|jpe?g)$/i.test(file)) continue;
    const { width, height } = await sharp(join(ROOT, slug.name, file)).metadata();
    sizes[`/${slug.name}/${file}`] = [width, height];
  }
}
await writeFile("app/data/imageSizes.json", JSON.stringify(sizes, null, 2) + "\n");
console.log(`${Object.keys(sizes).length} images`);
