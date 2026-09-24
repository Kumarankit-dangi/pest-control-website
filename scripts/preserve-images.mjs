#!/usr/bin/env node
// Copies original bytes only: never generates, resizes, or overwrites images.
import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

export async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isSymbolicLink()) throw new Error(`Refusing symlink: ${file}`);
    if (entry.isDirectory()) files.push(...await filesUnder(file));
    else if (entry.isFile()) files.push(file);
  }
  return files.sort();
}

export async function referencedImages(root) {
  const names = new Set();
  for (const file of await filesUnder(path.join(root, 'src'))) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/\/images\/([^\s"'`<>)}?#]+)/g)) {
      const name = match[1];
      if (name.split('/').some(part => !part || part === '..' || part === '.') || name.includes('\\')) {
        throw new Error(`Unsafe image path: ${name}`);
      }
      names.add(name);
    }
  }
  return [...names].sort();
}

export function validateImage(name, bytes) {
  const ext = path.extname(name).toLowerCase();
  const valid = {
    '.jpg': () => bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
    '.jpeg': () => bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
    '.png': () => bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])),
    '.svg': () => /^\s*(?:<\?xml[^>]*>\s*)?(?:<!--[^]*?-->\s*)*<svg[\s>]/i.test(bytes.toString('utf8')),
    '.webp': () => bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP',
    '.gif': () => /^GIF8[79]a/.test(bytes.toString('ascii', 0, 6)),
  }[ext];
  if (!valid || !valid()) throw new Error(`Not a valid ${ext} image header: ${name} (possibly an error/login page)`);
}

async function existing(file) {
  try { return await readFile(file); }
  catch (error) { if (error.code === 'ENOENT') return null; throw error; }
}

export async function audit(root) {
  const directory = path.join(root, 'public/images');
  let complete = true;
  for (const name of await referencedImages(root)) {
    const bytes = await existing(path.join(directory, name));
    if (!bytes) { console.error(`MISSING /images/${name}`); complete = false; }
    else {
      try { validateImage(name, bytes); }
      catch (error) { console.error(error.message); complete = false; }
    }
  }
  for (const file of await filesUnder(directory)) {
    const bytes = await readFile(file);
    console.log(`${createHash('sha256').update(bytes).digest('hex')}  public/images/${path.relative(directory, file)}`);
  }
  return complete;
}

export async function recover(root, mode, source) {
  const directory = path.join(root, 'public/images');
  const required = await referencedImages(root);
  const copies = new Map();
  if (mode === '--from-directory') {
    const origin = path.resolve(source);
    for (const file of await filesUnder(origin)) copies.set(path.relative(origin, file), await readFile(file));
    for (const name of required) {
      if (!copies.has(name) && !await existing(path.join(directory, name))) {
        throw new Error(`Source folder is missing ${name}; no images copied.`);
      }
    }
  } else if (mode === '--from-url') {
    const base = new URL(source);
    if (!['http:', 'https:'].includes(base.protocol) || base.username || base.password) {
      throw new Error('Use a public HTTP(S) preview URL without embedded credentials.');
    }
    for (const name of required) {
      // Fetch original public URLs, not Next image-optimizer derivatives.
      const url = new URL(`/images/${name.split('/').map(encodeURIComponent).join('/')}`, base);
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`HTTP ${response.status} for /images/${name}; no images copied.`);
      const bytes = Buffer.from(await response.arrayBuffer());
      validateImage(name, bytes);
      copies.set(name, bytes);
    }
  } else throw new Error('Expected --from-url or --from-directory.');

  // Validate the whole batch and conflicts before writing anything.
  for (const [name, bytes] of copies) {
    if (required.includes(name)) validateImage(name, bytes);
    const current = await existing(path.join(directory, name));
    if (current && !current.equals(bytes)) throw new Error(`Existing image differs: ${name}; refusing to overwrite. No images copied.`);
  }
  for (const [name, bytes] of copies) {
    const destination = path.join(directory, name);
    if (await existing(destination)) continue;
    await mkdir(path.dirname(destination), { recursive: true });
    await writeFile(destination, bytes, { flag: 'wx' });
    console.log(`Copied original: public/images/${name}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  try {
    const [mode, source, ...extra] = process.argv.slice(2);
    if (extra.length || (mode === '--check' ? source : !source)) {
      throw new Error('Usage: node scripts/preserve-images.mjs --check | --from-url PREVIEW_URL | --from-directory ORIGINAL_IMAGES_FOLDER');
    }
    if (mode !== '--check') await recover(root, mode, source);
    if (!await audit(root)) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
