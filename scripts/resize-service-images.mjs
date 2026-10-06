import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const imagesRoot = path.join(projectRoot, 'public', 'images', 'services');
const maxBytes = 300 * 1024;
const maxWidth = 1200;

const sharpModuleUrl = new URL(
  '../node_modules/.pnpm/sharp@0.34.5/node_modules/sharp/lib/index.js',
  import.meta.url,
);
const sharp = (await import(sharpModuleUrl.href)).default;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

async function resizeIfNeeded(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

  if (!allowed.has(ext)) {
    return false;
  }

  const stats = await fs.stat(filePath);
  const meta = await sharp(filePath).metadata();
  const needsResize = stats.size > maxBytes || (meta.width ?? 0) > maxWidth;

  if (!needsResize) {
    return false;
  }

  const outputPath = path.join(path.dirname(filePath), `${path.basename(filePath, ext)}.webp`);
  await sharp(filePath)
    .rotate()
    .resize({ width: maxWidth, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(outputPath);

  await fs.unlink(filePath);
  console.log(`Resized ${path.relative(projectRoot, filePath)} -> ${path.relative(projectRoot, outputPath)}`);
  return true;
}

const files = await walk(imagesRoot);
let changed = 0;
for (const filePath of files) {
  changed += (await resizeIfNeeded(filePath)) ? 1 : 0;
}

if (changed === 0) {
  console.log('No service images exceeded 300 KB or 1200px width; no resize was needed.');
}
