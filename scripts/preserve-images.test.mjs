import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer } from 'node:http';
import { audit, recover, referencedImages, validateImage } from './preserve-images.mjs';

// Test fixtures are isolated in temporary folders; never written into public/.
const original = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><path d="M0 0"/></svg>');
async function fixture(t, references = ['/images/original.svg']) {
  const root = await mkdtemp(path.join(tmpdir(), 'image-preservation-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, 'src'));
  await mkdir(path.join(root, 'public/images'), { recursive: true });
  await mkdir(path.join(root, 'export'));
  await writeFile(path.join(root, 'src/page.tsx'), references.map(r => `const image = "${r}";`).join('\n'));
  return root;
}
async function server(t, handler) {
  const instance = createServer(handler);
  await new Promise(resolve => instance.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => instance.close(resolve)));
  return `http://127.0.0.1:${instance.address().port}`;
}

test('finds and deduplicates references and rejects traversal', async t => {
  const root = await fixture(t, ['/images/original.svg', '/images/original.svg?x=1']);
  assert.deepEqual(await referencedImages(root), ['original.svg']);
  await writeFile(path.join(root, 'src/bad.tsx'), '"/images/../outside.svg"');
  await assert.rejects(referencedImages(root), /Unsafe image path/);
});

test('copies every exported file byte-for-byte and is idempotent', async t => {
  const root = await fixture(t);
  const source = path.join(root, 'export');
  await writeFile(path.join(source, 'original.svg'), original);
  await mkdir(path.join(source, 'extra'));
  await writeFile(path.join(source, 'extra/unreferenced.svg'), original);
  await recover(root, '--from-directory', source);
  await recover(root, '--from-directory', source);
  assert.deepEqual(await readFile(path.join(root, 'public/images/original.svg')), original);
  assert.deepEqual(await readFile(path.join(root, 'public/images/extra/unreferenced.svg')), original);
  assert.equal(await audit(root), true);
});

test('refuses to replace existing assets before writing any files', async t => {
  const root = await fixture(t);
  const source = path.join(root, 'export');
  await writeFile(path.join(source, 'original.svg'), original);
  await writeFile(path.join(source, 'a-new.svg'), original);
  const previous = Buffer.from('<svg>existing original</svg>');
  await writeFile(path.join(root, 'public/images/original.svg'), previous);
  await assert.rejects(recover(root, '--from-directory', source), /refusing to overwrite/);
  assert.deepEqual(await readdir(path.join(root, 'public/images')), ['original.svg']);
  assert.deepEqual(await readFile(path.join(root, 'public/images/original.svg')), previous);
});

test('missing originals stop directory recovery and fail the audit', async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, 'export/extra.svg'), original);
  await assert.rejects(recover(root, '--from-directory', path.join(root, 'export')), /missing original.svg/);
  assert.deepEqual(await readdir(path.join(root, 'public/images')), []);
  assert.equal(await audit(root), false);
});

test('URL recovery uses original public paths and preserves bytes', async t => {
  const root = await fixture(t);
  const url = await server(t, (req, res) => {
    assert.equal(req.url, '/images/original.svg');
    res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
    res.end(original);
  });
  await recover(root, '--from-url', url);
  assert.deepEqual(await readFile(path.join(root, 'public/images/original.svg')), original);
});

test('HTTP errors and HTML login responses do not create partial files', async t => {
  for (const status of [200, 404]) {
    const root = await fixture(t, ['/images/a.svg', '/images/z.svg']);
    const url = await server(t, (req, res) => {
      if (req.url === '/images/a.svg') return res.end(original);
      res.writeHead(status, { 'Content-Type': 'text/html' });
      res.end('<html>Not an image</html>');
    });
    await assert.rejects(recover(root, '--from-url', url), status === 200 ? /image header/ : /HTTP 404/);
    assert.deepEqual(await readdir(path.join(root, 'public/images')), []);
  }
});

test('rejects HTML disguised as a JPEG', () => {
  assert.throws(() => validateImage('original.jpg', Buffer.from('<html>Error</html>')), /image header/);
});
