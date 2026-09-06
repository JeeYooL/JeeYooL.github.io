#!/usr/bin/env node
/**
 * Shrink oversized source images in src/assets/ before they go into git.
 *
 *   npm run images          list what would change (safe, changes nothing)
 *   npm run images -- --fix rewrite the oversized ones in place
 *
 * Astro already generates the responsive sizes the site serves. This exists
 * only so a 4000-pixel, 6 MB phone photo does not live in the repository
 * forever and slow every CI build.
 */
import { readdir, stat, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import sharp from 'sharp';

const ROOT = 'src/assets';
const MAX_EDGE = 2400; // plenty for a full-screen lightbox on a retina display
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const fix = process.argv.includes('--fix');

async function* walk(dir) {
  let entries;
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (EXT.has(extname(e.name).toLowerCase())) yield p;
  }
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
let touched = 0;
let saved = 0;

for await (const file of walk(ROOT)) {
  const before = (await stat(file)).size;
  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);
  if (longest <= MAX_EDGE && before < 900_000) continue;

  const isPng = extname(file).toLowerCase() === '.png';
  const buf = await img
    .rotate() // honour the phone's EXIF orientation, then drop the tag
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    [isPng ? 'png' : 'jpeg'](isPng ? { compressionLevel: 9 } : { quality: 82, mozjpeg: true })
    .toBuffer();

  touched++;
  saved += before - buf.length;
  console.log(
    `${fix ? 'resized' : 'would resize'}  ${file}` +
      `\n    ${meta.width}×${meta.height}, ${kb(before)}  →  max ${MAX_EDGE}px, ${kb(buf.length)}`,
  );
  if (fix) await writeFile(file, buf);
}

if (!touched) console.log(`Nothing to do — every image under ${ROOT}/ is already within ${MAX_EDGE}px.`);
else if (!fix) console.log(`\n${touched} file(s) would shrink by ${kb(saved)} in total. Re-run with --fix to apply.`);
else console.log(`\n${touched} file(s) rewritten, ${kb(saved)} saved.`);
