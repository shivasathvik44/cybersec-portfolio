import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const port = Number(process.env.PORT || 5173);
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filename = resolve(root, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (filename !== root && !filename.startsWith(root + sep)) {
      response.writeHead(403); response.end('Forbidden'); return;
    }
    const info = await stat(filename);
    if (!info.isFile()) throw new Error('Not a file');
    const data = await readFile(filename);
    response.writeHead(200, { 'Content-Type': contentTypes[extname(filename)] || 'application/octet-stream' });
    response.end(data);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not found');
  }
}).listen(port, () => console.log(`Cybersec portfolio running at http://localhost:${port}`));
