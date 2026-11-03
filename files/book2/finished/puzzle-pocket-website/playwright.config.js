// Settings for the Playwright browser tests. Run them with: npm run test:e2e
//
// By default, the tests build the site and test the finished version locally.
// To test the published site instead, set BASE_URL first, for example:
//   macOS:   BASE_URL=https://puzzle-pocket.netlify.app npm run test:e2e
//   Windows: set BASE_URL=https://puzzle-pocket.netlify.app && npm run test:e2e

import { defineConfig, devices } from '@playwright/test';

const liveSite = process.env.BASE_URL;

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: liveSite ?? 'http://localhost:4173',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: liveSite
    ? undefined
    : {
        command: 'npm run build && npm run preview -- --port 4173 --strictPort',
        url: 'http://localhost:4173',
        reuseExistingServer: true,
      },
});
