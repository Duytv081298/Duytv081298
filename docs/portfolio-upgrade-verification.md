# Portfolio upgrade verification

Work remains isolated on `feature/portfolio-evidence-seo-audit`. The Pages deployment
workflow and `main` are unchanged. No merge or deployment is performed by this audit.

## Content and evidence

- Hero and About use the supplied CV summary, 6+ years, four employers, education,
  and the 2024 PIXON award. About links directly to both original PDFs.
- Shared `profile.ts` drives Hero, About, career and CV content; all support English,
  Vietnamese and Simplified Chinese. Chinese UI defaults to the English PDF.
- PDF bytes match the supplied originals:
  - English: `61e4272cbc89a6fca227a4e6e7b6cf2c9f88ee13a2eb3b9ac78a5fe3b49bfaae`
  - Vietnamese: `9521da6dbdcd01b1548c0200e5c17cd8687d001850e68cd50f911680067be8a1`
- Featured projects link to Bloom Sort, Screw Puzzle and Coffee Please, each with
  architecture, challenges, proposed solutions, trade-offs, a validation plan,
  and a directly inspectable playable artifact.
- Original project source and device benchmark reports are not supplied. Internal
  implementation notes are explicitly design analysis, not verified attribution.
  Unsupported before/after benchmark numbers were removed from all case pages.
- `demoEvidence.json` contains reproducible HTML byte counts and SHA-256 hashes.
  `npm run evidence:check` fails if an artifact changes without updating the record.

| Featured artifact | HTML bytes | Decimal MB |
| --- | ---: | ---: |
| Bloom Sort | 5,114,189 | 5.11 |
| Screw Puzzle | 2,283,706 | 2.28 |
| Coffee Please | 3,830,541 | 3.83 |

HTML bytes are not compressed transfer sizes, memory use, FPS or SDK acceptance.
The CV's 2–5 MB budget and 70% automation improvement are career claims from the CV,
not measurements made by this website audit. The incorrect “each <5 MB” label has
been replaced with a size-budget label.

## Executed checks

Baseline production audit of commit `72269b35be5108609784bc37648c7fa3f999f4f3`,
17 November 2026, GitHub Actions / Ubuntu / Node 22 / Chromium:

- `npm ci`: passed.
- `npm run lint -- --max-warnings=0`: passed.
- `npm run evidence:check`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed, static routes including sitemap and robots exported.
- Playwright: **29 passed in 44.6 seconds**, no retries needed.
- axe WCAG 2 A/AA and WCAG 2.1 AA: zero violations in the audited states.
- Mobile Lighthouse 13.6.0: Performance **93**, Accessibility **100**,
  Best Practices **100**, SEO **100**.
- FCP **2.4 s**, LCP **2.4 s**, TBT **120 ms**, CLS **0**, Speed Index **2.8 s**.

Run and downloadable reports:
https://github.com/Duytv081298/Duytv081298/actions/runs/43984690967

Detailed inspection also found an unscored label/name mismatch on game tiles.
The follow-up removes redundant decorative text, includes the visible category in
accessible names and adds a dedicated regression test. Store thumbnails request a
size closer to their display size. The branch workflow reruns all checks after
these changes; consult the latest successful run for the final revision's scores.

## Reproduce the production checks

Use Node 22.12+:

```sh
npm ci
npm run lint -- --max-warnings=0
npm run evidence:check
npm run typecheck
npm run build
npx playwright install --with-deps chromium
TEST_STATIC_EXPORT=1 TEST_BASE_PATH=/Duytv081298 npm test
```

The suite audits the actual static export under the GitHub Pages repository path,
not only Next.js development mode. It covers device locale selection, persistence,
blocked storage, tab synchronization, reduced motion, keyboard focus, mobile menu,
CV dialogs/downloads/copy links, legacy CV URLs, player controls, missing artwork,
320/375/768/1024/1440 px home layouts, all three featured cases at 320/1440 px in all
languages, artifact hashes, no-JavaScript content, canonical/social metadata and
sitemap links. Native game contents retain their original language.

## SEO and performance scope

Canonical URLs, PNG Open Graph/Twitter cards, Person JSON-LD, sitemap and robots
are exported. Language selection is client-side: static HTML and social metadata
remain English; there are no separate indexable language routes. On Project Pages,
robots.txt is served beneath the repository path; the host-root robots policy is
outside this repository's control.

Lighthouse uses the uncompressed reference static server with its default cache
headers. CDN compression/caching and real network latency on public Pages can
produce different results. Remaining opportunities include render-blocking CSS,
framework compatibility code and main-thread work; these are performance
recommendations, not failed functional checks. No real-device game FPS, SDK
certification, manual screen-reader audit or field Core Web Vitals are claimed.
