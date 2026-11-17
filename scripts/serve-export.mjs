import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve('out');
const prefix = process.env.TEST_BASE_PATH || '/Duytv081298';
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain', '.xml': 'application/xml', '.pdf': 'application/pdf', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', 'http://localhost');
    if (url.pathname !== prefix && !url.pathname.startsWith(`${prefix}/`)) throw new Error('Unknown path');
    const file = resolve(root, `.${decodeURIComponent(url.pathname.slice(prefix.length) || '/')}`);
    if (file !== root && !file.startsWith(`${root}${sep}`)) throw new Error('Invalid path');
    const info = await stat(file);
    if (info.isDirectory() && !url.pathname.endsWith('/')) {
      res.writeHead(308, { Location: `${url.pathname}/${url.search}` }); res.end(); return;
    }
    const path = info.isDirectory() ? resolve(file, 'index.html') : file;
    res.writeHead(200, { 'Content-Type': `${types[extname(path)] || 'application/octet-stream'}` });
    res.end(await readFile(path));
  } catch { res.writeHead(404); res.end('Not found'); }
}).listen(Number(process.env.PORT || 3000), '127.0.0.1', () => console.log(`Static export: http://127.0.0.1:${process.env.PORT || 3000}${prefix}/`));
