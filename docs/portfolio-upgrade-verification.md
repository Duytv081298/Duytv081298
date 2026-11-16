# Portfolio upgrade verification

This branch is intentionally isolated from `main`.

## Content and evidence
- [x] README experience and playable-ad count aligned with current portfolio claims.
- [x] Three featured case studies: Bloom Sort, Screw Puzzle, Coffee Please.
- [x] English, Vietnamese, Simplified Chinese labels on featured cards.
- [x] Case study metric disclaimer; project-specific before/after measurements need source benchmark evidence.
- [x] Canonical and social metadata for homepage and game routes.
- [ ] Validate source CV PDFs against every career claim and each project attribution.
- [ ] Supply benchmark reports and confirm individual project results before publishing as verified.

## Local quality gate (required before PR)
Use Node.js 22.12+:

```sh
npm ci
npm run lint -- --max-warnings=0
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Check keyboard-only navigation, focus states, 320/375/768/1024/1440px viewports, all three languages, reduced motion, CV links, axe WCAG A/AA findings, and network failures. Measure mobile Lighthouse Performance, Accessibility, Best Practices and SEO on the built site; record actual scores rather than estimating them.

## Deployment
Do not merge until all checks pass. GitHub Pages is deployed from main by the existing deployment workflow.
