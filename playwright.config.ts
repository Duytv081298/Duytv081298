import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: process.env.CI ? 2 : 3,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:3000',
    browserName: 'chromium',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {},
    trace: 'retain-on-failure',
  },
  webServer: process.env.TEST_BASE_URL ? undefined : {
    command: process.env.TEST_STATIC_EXPORT ? 'node scripts/serve-export.mjs' : 'npm run dev -- --hostname 127.0.0.1',
    url: `http://127.0.0.1:3000${process.env.TEST_BASE_PATH || ''}/`,
    reuseExistingServer: !process.env.CI && !process.env.TEST_STATIC_EXPORT,
    timeout: 120000,
  },
});
