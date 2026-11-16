import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { resolveLocale } from '../src/components/i18n/locale';
import { messages } from '../src/components/i18n/messages';
import { games } from '../src/data/games';
import { localizeGame } from '../src/components/i18n/game-copy';

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
  ['en-US', 'en', 'Games Portfolio'], ['vi-VN', 'vi', 'Dự án trò chơi'], ['zh-TW', 'zh-CN', '游戏作品集'], ['de-DE', 'en', 'Games Portfolio'],
]) {
  test(`device locale ${locale} and translated content`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ baseURL, locale, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error' && /hydrat|didn't match/i.test(message.text())) errors.push(message.text()); });
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', code);
    await expect(page.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    expect(errors).toEqual([]);
    await context.close();
  });
}

test('choice survives reload and page navigation and synchronizes tabs', async ({ page, context }) => {
  await page.goto('/');
  await page.getByRole('combobox').selectOption('vi');
  await expect(page.locator('html')).toHaveAttribute('lang', 'vi');
  await page.reload();
  await expect(page.getByRole('combobox')).toHaveValue('vi');
  const other = await context.newPage();
  await other.goto('/games/bloom-sort');
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
  await page.goto('/');
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
    await page.goto('/');
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
  await page.goto('/');
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
  await page.goto('/');
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
  await page.goto('/');
  await page.locator('#playable').getByRole('button', { name: 'Show Puzzle playable ads', exact: true }).click();
  await expect(page.locator('#playable [aria-pressed="true"]')).toHaveText('Puzzle');
  const game = page.locator('#playable-ads-grid button').first();
  await game.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
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
  await page.goto('/games/bloom-sort');
  for (const locale of ['en', 'vi', 'zh']) {
    await page.getByRole('combobox').selectOption(locale);
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  }
});

for (const preference of ['reduce', 'no-preference'] as const) {
  test(`hydration is stable with ${preference} motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: preference });
    await page.goto('/');
    await page.getByRole('combobox').selectOption('zh');
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
    await page.goto('/games/bloom-sort');
    await expect(page.getByRole('heading', { name: '架构', exact: true })).toBeVisible();
  });
}

test('unavailable store artwork falls back to usable game tiles', async ({ page }) => {
  await page.route('**/play-lh.googleusercontent.com/**', (route) => route.abort());
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const tile = page.locator('#playable-ads-grid button').first();
  await tile.scrollIntoViewIfNeeded();
  await expect(tile.locator('img')).toHaveCount(0);
  await expect(tile).toHaveCSS('opacity', '1');
  await expect(tile).toHaveAccessibleName(/Play /);
  await tile.click();
  await expect(page.getByRole('dialog')).toBeVisible();
});
