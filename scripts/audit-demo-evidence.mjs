import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
const evidence = Object.fromEntries(['bloom-sort', 'screw-puzzle', 'coffee-please'].map((slug) => {
  const publicPath = `/playable/${slug}/index.html`;
  const bytes = readFileSync(`public${publicPath}`);
  return [slug, { publicPath, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), title: bytes.toString('utf8').match(/<title>(.*?)<\/title>/s)?.[1] ?? '' }];
}));
const result = `${JSON.stringify(evidence, null, 2)}\n`;
const target = 'src/data/demoEvidence.json';
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== result) throw new Error('Demo evidence is stale. Run npm run evidence:update.');
  console.log('Verified exact bytes and SHA-256 for all three featured demo artifacts.');
} else { writeFileSync(target, result); console.log(`Updated ${target}`); }
