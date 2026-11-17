import { chromium } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

// Inspect packaged components, not engine-wide string matches. Counts include inactive nodes.
const specs = {
  arrow: { ArrowGraphics: ['generateCombinedMesh', 'calculateMeshData', 'getRibbonMetricInfo', 'buildSmoothedPath'], ArrowMove: ['handleCollision', 'rebuildActivePath'] },
  'car-blast': { PixelArtController: ['initGrid', 'buildPixels', 'checkHiddenPixel', 'removeCell'], WoolMove: ['moveByCurve', 'moveToSlot', 'clearTween'] },
  'drink-sort': { PourWater: ['rotationSegmentRuntime', 'initCacheWater', 'showWaterMaskInRotation'], WaterMask: ['setSize', 'setColor'], CurvedShape: ['refresh', '_doRefresh'] },
  'screw-town': { Screw: ['checkCanTouch', 'disableComponent', 'enableComponent'], Button3D: ['onHandlerClick'], OrbitCamera: ['onLoad'] },
  'knit-away': { CameraController: ['_onTouchMove', '_rotateAround'], FadeThread: ['CalculateRopePoint', 'FadeMaterial'], Rope: ['UpdateRopeHead', 'SetColor'] },
  'ball-away': { BallPhysics: ['activePhysics', 'removePhysics'], BallController: ['validateData', 'spawnBalls', 'initMapBall'] },
};
const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined, headless: true });
const evidence = {};
try {
  mkdirSync('public/images/technical-reviews', { recursive: true });
  for (const [slug, methods] of Object.entries(specs)) {
    const page = await browser.newPage({ viewport: { width: 440, height: 800 } });
    // Keep inspection local; the demo does not need analytics or store requests to render.
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      return ['data:', 'blob:', 'about:'].includes(url.protocol) || url.origin === new URL(baseURL).origin ? route.continue() : route.abort();
    });
    const publicPath = `/playable/${slug}/index.html`;
    await page.goto(`${baseURL}${publicPath}`);
    await page.waitForFunction(() => window.cc?.director?.getScene());
    const snapshot = await page.evaluate((required) => {
      const counts = {}, found = {};
      function visit(node) {
        for (const component of node.components || []) {
          const name = window.cc.js.getClassName(component);
          counts[name] = (counts[name] || 0) + 1;
          if (required[name]) found[name] = required[name].filter(method => typeof component[method] === 'function');
        }
        for (const child of node.children || []) visit(child);
      }
      visit(window.cc.director.getScene());
      return { counts, methods: found };
    }, methods);
    for (const [name, expected] of Object.entries(methods)) {
      if (snapshot.methods[name]?.length !== expected.length) throw new Error(`Missing inspected methods: ${slug}/${name}`);
    }
    // Let the intro animation settle before recording an illustrative screenshot.
    await page.waitForTimeout(2200);
    await page.screenshot({ path: `public/images/technical-reviews/${slug}.png` });
    const bytes = readFileSync(path.join('public', publicPath));
    evidence[slug] = { publicPath, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), title: await page.title(), components: snapshot.counts, methods: snapshot.methods };
    console.log(`Verified ${slug}: ${Object.keys(snapshot.methods).join(', ')}`);
    await page.close();
  }
  const manifest = `${JSON.stringify(evidence, null, 2)}\n`;
  writeFileSync('src/data/technicalDemoEvidence.json', manifest);
  mkdirSync('public/evidence', { recursive: true });
  writeFileSync('public/evidence/3d-demo-audit.json', manifest);
} finally { await browser.close(); }
