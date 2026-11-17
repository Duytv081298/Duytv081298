import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { resolveLocale } from '../src/components/i18n/locale';
import { messages } from '../src/components/i18n/messages';
import { games } from '../src/data/games';
import { caseStudies, caseStudySlugs } from '../src/data/caseStudies';
import demoEvidence from '../src/data/demoEvidence.json';
import technicalEvidence from '../src/data/technicalDemoEvidence.json';
import { technicalReviews } from '../src/data/technicalReviews';
import { localizeGame } from '../src/components/i18n/game-copy';

const basePath = process.env.TEST_BASE_PATH || '';
const at = (path: string) => `${basePath}${path}`;

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydrat|didn't match|uncaught/i.test(message.text())) errors.push(message.text());
  });
  // Assert after every browser test so hydration regressions cannot pass silently.
  Object.assign(page, { portfolioErrors: errors });
});
test.afterEach(async ({ page }) => {
  const tracked = page as typeof page & { portfolioErrors?: string[] };
  expect(tracked.portfolioErrors ?? []).toEqual([]);
});

test('locale resolution respects saved choices, regional tags and fallback', () => {
  expect(resolveLocale('vi', ['zh-CN'])).toBe('vi');
  expect(resolveLocale(null, ['vi-VN', 'en-US'])).toBe('vi');
  expect(resolveLocale(null, ['zh-TW'])).toBe('zh');
  expect(resolveLocale(null, ['de-DE', 'zh-Hans-CN'])).toBe('zh');
  expect(resolveLocale('invalid', ['ja-JP'])).toBe('en');
  expect(resolveLocale(null, [])).toBe('en');
});

test('translations keep interpolation tokens and all case study content', () => {
  for (const [source, translations] of Object.entries(messages)) {
    const tokens = source.match(/\{\w+\}/g)?.sort() ?? [];
    for (const translation of translations) {
      expect(translation.trim(), source).not.toBe('');
      expect(translation.match(/\{\w+\}/g)?.sort() ?? [], source).toEqual(tokens);
    }
  }
  for (const game of games) for (const locale of ['vi', 'zh'] as const) {
    const translated = localizeGame(game, locale);
    expect(translated.description).not.toBe(game.description);
    expect(translated.architecture).not.toBe(game.architecture);
    expect(translated.challenges).toHaveLength(game.challenges.length);
    expect(translated.solutions).toHaveLength(game.solutions.length);
  }
});

for (const [locale, code, heading] of [
  ['en-US', 'en', 'Selected engineering case studies'], ['vi-VN', 'vi', 'Case study kỹ thuật tiêu biểu'], ['zh-TW', 'zh-CN', '精选工程案例'], ['de-DE', 'en', 'Selected engineering case studies'],
]) {
  test(`device locale ${locale} and translated content`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, locale, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error' && /hydrat|didn't match/i.test(message.text())) errors.push(message.text()); });
    await page.goto(at('/'));
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#games a[href*="/games/"]')).toHaveCount(caseStudySlugs.length);
    expect(errors).toEqual([]);
    await context.close();
  });
}

test('choice survives reload and page navigation and synchronizes tabs', async ({ page, context }) => {
  await page.goto(at('/'));
  await page.getByRole('combobox').selectOption('vi');
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await page.reload();
  await expect(page.getByRole('combobox')).toHaveValue('vi');
  const other = await context.newPage();
  await other.goto(at('/games/bloom-sort/'));
  await expect(other.getByRole('heading', { name: 'Kiến trúc', exact: true })).toBeVisible();
  await other.getByRole('combobox').selectOption('zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(other.getByRole('heading', { name: '架构', exact: true })).toBeVisible();
  await other.reload();
  await expect(other.getByRole('combobox')).toHaveValue('zh');
});

test('blocked storage still supports detection and manual selection', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, locale: 'vi-VN' });
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', { get() { throw new DOMException('Blocked', 'SecurityError'); } });
  });
  const page = await context.newPage();
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(at('/'));
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await page.getByRole('combobox').selectOption('zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  expect(errors).toEqual([]);
  await context.close();
});

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`responsive layout and accessibility at ${width}px in all languages`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(at('/'));
    for (const locale of ['en', 'vi', 'zh']) {
      await page.getByRole('combobox').selectOption(locale);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      // Audit the entire visible document, including navigation and filters.
      await expect(page.locator('#playable-ads-grid button').first()).toHaveCSS('opacity', '1');
      if (locale === 'en' && (width === 375 || width === 1440)) await page.screenshot({ path: `test-results/portfolio-${width}.png`, fullPage: true });
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
    }
  });
}

test('mobile menu contains focus, closes on Escape and navigates to a section', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(at('/'));
  const trigger = page.getByRole('button', { name: 'Open navigation menu' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
  expect(await dialog.evaluate((node) => node.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact')).toBeFocused();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('CV dialog is localized, accessible and restores focus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(at('/'));
  const trigger = page.getByRole('button', { name: 'Download CV', exact: true }).first();
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Curriculum Vitae', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', /\.pdf$/);
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(audit.violations.map(({ id }) => id)).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test('playable filtering and player controls work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(at('/'));
  await page.locator('#playable').getByRole('button', { name: 'Show Puzzle playable ads', exact: true }).click();
  await expect(page.locator('#playable [aria-pressed="true"]')).toHaveText('Puzzle');
  const game = page.locator('#playable-ads-grid button').first();
  await game.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAccessibleName('Block Buster');
  await expect(dialog.locator('iframe')).toBeVisible();
  await dialog.getByRole('button', { name: 'Rotate Simulator', exact: true }).click();
  await dialog.getByRole('button', { name: 'Maximize Player', exact: true }).click();
  await dialog.getByRole('button', { name: 'Exit Fullscreen', exact: true }).click();
  await dialog.getByRole('button', { name: 'Close Panel', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(game).toBeFocused();
});

test('case study pages have no accessibility violations in each language', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(at('/games/bloom-sort/'));
  for (const locale of ['en', 'vi', 'zh']) {
    await page.getByRole('combobox').selectOption(locale);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  }
});

for (const preference of ['reduce', 'no-preference'] as const) {
  test(`hydration is stable with ${preference} motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: preference });
    await page.goto(at('/'));
    await page.getByRole('combobox').selectOption('zh');
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
    await page.goto(at('/games/bloom-sort/'));
    await expect(page.getByRole('heading', { name: '架构', exact: true })).toBeVisible();
  });
}

test('unavailable store artwork falls back to usable game tiles', async ({ page }) => {
  await page.route('**/play-lh.googleusercontent.com/**', (route) => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(at('/'));
  const tile = page.locator('#playable-ads-grid button').first();
  await tile.scrollIntoViewIfNeeded();
  await expect(tile.locator('img')).toHaveCount(0);
  await expect(tile).toHaveCSS('opacity', '1');
  await expect(tile).toHaveAccessibleName(/Play /);
  await tile.click();
  await expect(page.getByRole('dialog')).toBeVisible();
});

for (const scenario of [
  { ui: 'en', pdf: 'en', cv: 'Download CV', download: 'Download PDF', copy: 'Copy CV link', online: 'View online', award: 'Employee of the Year 2024' },
  { ui: 'vi', pdf: 'vi', cv: 'Tải CV', download: 'Tải PDF', copy: 'Sao chép liên kết CV', online: 'Xem trực tuyến', award: 'Nhân viên xuất sắc của năm 2024' },
  { ui: 'zh', pdf: 'en', cv: '下载简历', download: '下载 PDF', copy: '复制简历链接', online: '在线查看', award: '2024 年度优秀员工' },
]) {
  test(`updated CV matches the ${scenario.ui} interface and supports both original PDFs`, async ({ page, context }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto(at('/'));
    await page.getByRole('combobox').selectOption(scenario.ui);
    await page.locator('#hero').getByRole('button', { name: scenario.cv, exact: true }).click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('combobox')).toHaveValue(scenario.pdf);
    await expect(dialog.getByRole('heading', { name: scenario.award, exact: true })).toBeVisible();
    await expect(dialog.getByText(/70%/)).toBeVisible();
    const firstFile = `TRINH-VAN-DUY_${scenario.pdf === 'vi' ? 'VN' : 'EN'}.pdf`;
    await expect(dialog.getByRole('link', { name: scenario.download, exact: true })).toHaveAttribute('href', `${basePath}/cv/${firstFile}`);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
    expect(await dialog.evaluate((node) => node.scrollWidth <= node.clientWidth)).toBe(true);
    const alternate = scenario.pdf === 'en' ? 'vi' : 'en';
    const alternateFile = `TRINH-VAN-DUY_${alternate === 'vi' ? 'VN' : 'EN'}.pdf`;
    await dialog.getByRole('combobox').selectOption(alternate);
    await expect(dialog.getByRole('link', { name: scenario.online, exact: true })).toHaveAttribute('href', `${basePath}/cv/${alternateFile}`);
    await dialog.getByRole('button', { name: scenario.copy, exact: true }).click();
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toContain(`${basePath}/cv/${alternateFile}`);
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      dialog.getByRole('link', { name: scenario.download, exact: true }).click(),
    ]);
    expect(download.suggestedFilename()).toBe(alternateFile);
    expect(await download.failure()).toBeNull();
  });
}

test('English, Vietnamese and legacy PDF URLs serve the exact supplied CVs', async ({ request }) => {
  const { readFile } = await import('node:fs/promises');
  for (const [url, source] of [
    ['/cv/TRINH-VAN-DUY_EN.pdf', 'public/cv/TRINH-VAN-DUY_EN.pdf'],
    ['/cv/TRINH-VAN-DUY_VN.pdf', 'public/cv/TRINH-VAN-DUY_VN.pdf'],
    ['/cv/CV_Trinh_Van_Duy_Cocos_Developer.pdf', 'public/cv/TRINH-VAN-DUY_VN.pdf'],
    ['/CV_TrinhVanDuy.pdf', 'public/cv/TRINH-VAN-DUY_VN.pdf'],
  ]) {
    const response = await request.get(at(url));
    expect(response.ok()).toBe(true);
    const data = await response.body();
    expect(data.subarray(0, 16).toString()).toMatch(/^\s*%PDF-\d\.\d/);
    expect(data.equals(await readFile(source))).toBe(true);
  }
});

for (const slug of caseStudySlugs) {
  test(`case study ${slug} has evidence and works at mobile and desktop sizes in every language`, async ({ page, request }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(at(`/games/${slug}/`));
    const evidence = demoEvidence[slug];
    const { createHash } = await import('node:crypto');
    const demo = await request.get(at(evidence.publicPath));
    expect(demo.ok()).toBe(true);
    const bytes = await demo.body();
    expect(bytes.byteLength).toBe(evidence.bytes);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(evidence.sha256);
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const locale of ['en', 'vi', 'zh']) {
        await page.getByRole('combobox').selectOption(locale);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await expect(page.locator('#evidence-heading')).toBeVisible();
        await expect(page.locator('#tradeoffs-heading')).toBeVisible();
        await expect(page.locator('#implementation-heading')).toBeVisible();
        await expect(page.locator('#decisions-heading')).toBeVisible();
        const translated = (text: string) => locale === 'en' ? text : messages[text][locale === 'vi' ? 0 : 1];
        await expect(page.locator('main')).toContainText(translated(caseStudies[slug].implementation));
        await expect(page.locator('main')).toContainText(translated(caseStudies[slug].value));
        for (const decision of caseStudies[slug].decisions) {
          await expect(page.getByRole('heading', { name: translated(decision.title), exact: true })).toBeVisible();
        }
        const disclosure = page.getByTestId('technical-evidence');
        if (!(await disclosure.evaluate(node => (node as HTMLDetailsElement).open))) await disclosure.locator('summary').click();
        await expect(page.locator('a[href*="/playable/"]')).toHaveAttribute('href', at(evidence.publicPath));
        await expect(page.getByText(evidence.sha256, { exact: true })).toBeVisible();
        const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
      }
    }
  });
}

test('all design-review copy and CV-backed About content is translated', () => {
  for (const study of Object.values(caseStudies)) for (const key of [study.focus, study.context, study.implementation, study.value, study.architecture, study.tradeoff, study.nextStep, ...study.decisions.flatMap(decision => [decision.title, decision.body]), ...study.proof.map(item => item.label)]) {
    expect(messages[key], key).toHaveLength(2);
  }
  for (const review of technicalReviews) for (const key of [review.focus, review.implementation, review.value, review.observation, review.recommendation]) {
    expect(messages[key], key).toHaveLength(2);
  }
  for (const key of ['About Me', 'Client architecture', 'Production automation', 'Cross-platform delivery', 'Core engines']) expect(messages[key], key).toHaveLength(2);
});

for (const review of technicalReviews) {
  test(`3D technical evidence for ${review.slug} is inspectable and localized`, async ({ page, request }) => {
    const { createHash } = await import('node:crypto');
    const evidence = technicalEvidence[review.slug];
    const demo = await request.get(at(evidence.publicPath));
    expect(demo.ok()).toBe(true);
    const bytes = await demo.body();
    expect(bytes.byteLength).toBe(evidence.bytes);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(evidence.sha256);
    const manifest = await request.get(at('/evidence/3d-demo-audit.json'));
    expect(manifest.ok()).toBe(true);
    expect((await manifest.json())[review.slug]).toEqual(evidence);
    const screenshot = await request.get(at(`/images/technical-reviews/${review.slug}.png`));
    expect(screenshot.ok()).toBe(true);
    expect((await screenshot.body()).subarray(1, 4).toString()).toBe('PNG');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(at('/'));
    const card = page.getByRole('article', { name: review.title, exact: true });
    await expect(card.locator('details')).not.toHaveAttribute('open');
    await expect(card.getByText(review.implementation, { exact: true })).toBeVisible();
    await expect(card.getByText(review.value, { exact: true })).toBeVisible();
    await card.locator('summary').click();
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const locale of ['en', 'vi', 'zh']) {
        await page.getByRole('combobox').selectOption(locale);
        const translated = (text: string) => locale === 'en' ? text : messages[text][locale === 'vi' ? 0 : 1];
        await expect(card).toContainText(translated(review.recommendation));
        await expect(card).toContainText(translated(review.observation));
        await expect(card).toContainText(translated(review.implementation));
        await expect(card).toContainText(translated(review.value));
        await expect(card.locator('a[href*="/playable/"]')).toHaveAttribute('href', at(evidence.publicPath));
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        const audit = await new AxeBuilder({ page }).include(`article[aria-labelledby="review-${review.slug}"]`).analyze();
        expect(audit.violations).toEqual([]);
      }
    }
  });
}

test('Hero, About, featured navigation and SEO are present in prerendered HTML', async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${test.info().project.use.baseURL}${at('/')}`);
  await expect(page.locator('#hero h1')).toBeVisible();
  await expect(page.locator('#hero')).toContainText('6+ years');
  await expect(page.locator('#about')).toContainText('Employee of the Year 2024');
  await expect(page.locator('#about a[href$=".pdf"]')).toHaveCount(2);
  await expect(page.locator('#games a[href*="/games/"]')).toHaveCount(3);
  for (const slug of caseStudySlugs) await expect(page.locator(`#games a[href*="/games/${slug}"]`)).toBeVisible();
  expect(await page.evaluate(() => Boolean(document.querySelector('#games')!.compareDocumentPosition(document.querySelector('#playable-ads-grid')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://duytv081298.github.io/Duytv081298/');
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').innerText());
  expect(person.jobTitle).toBe('Senior Game Developer');
  await context.close();
  for (const slug of caseStudySlugs) {
    const response = await request.get(at(`/games/${slug}/`));
    const html = await response.text();
    expect(html).toContain(`https://duytv081298.github.io/Duytv081298/games/${slug}/`);
    expect(html).toContain('property="og:image"');
    expect(html).toContain('name="twitter:image"');
  }
  const image = await request.get(at('/social-card.png'));
  expect(image.ok()).toBe(true);
  expect((await image.body()).subarray(1, 4).toString()).toBe('PNG');
  if (process.env.TEST_STATIC_EXPORT) {
    const sitemap = await request.get(at('/sitemap.xml'));
    expect(sitemap.ok()).toBe(true);
    for (const slug of caseStudySlugs) expect(await sitemap.text()).toContain(`/games/${slug}/`);
    expect((await request.get(at('/robots.txt'))).ok()).toBe(true);
  }
});

test('visible playable labels match their accessible names in all languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(at('/'));
  for (const locale of ['en', 'vi', 'zh']) {
    await page.getByRole('combobox').selectOption(locale);
    const audit = await new AxeBuilder({ page }).withRules(['label-content-name-mismatch']).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  }
});
