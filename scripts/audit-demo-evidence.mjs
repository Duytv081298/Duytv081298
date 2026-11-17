import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
const evidence = Object.fromEntries(['arrow', 'screw-town', 'car-blast', 'bloom-sort', 'screw-puzzle', 'coffee-please'].map((slug) => {
  const publicPath = `/playable/${slug}/index.html`;
  const bytes = readFileSync(`public${publicPath}`);
  return [slug, { publicPath, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), title: bytes.toString('utf8').match(/<title>(.*?)<\/title>/s)?.[1] ?? '' }];
}));
const result = `${JSON.stringify(evidence, null, 2)}\n`;
const target = 'src/data/demoEvidence.json';
if (process.argv.includes('--check')) {
  if (readFileSync(target, 'utf8') !== result) throw new Error('Demo evidence is stale. Run npm run evidence:update.');
  const technicalManifest = readFileSync('src/data/technicalDemoEvidence.json');
  if (!technicalManifest.equals(readFileSync('public/evidence/3d-demo-audit.json'))) throw new Error('Public 3D inspection manifest is stale.');
  for (const [slug, entry] of Object.entries(JSON.parse(technicalManifest.toString('utf8')))) {
    const bytes = readFileSync(`public${entry.publicPath}`);
    if (bytes.length !== entry.bytes || createHash('sha256').update(bytes).digest('hex') !== entry.sha256) throw new Error(`3D evidence is stale: ${slug}. Run npm run evidence:3d:update with the dev server running.`);
  }
  console.log('Verified exact bytes and SHA-256 for featured case studies, legacy demos and technical evidence.');
} else { writeFileSync(target, result); console.log(`Updated ${target}`); }
