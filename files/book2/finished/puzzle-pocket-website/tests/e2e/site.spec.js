// Browser tests for every page. Each test names the row in TESTING.md it checks.
// Run them with: npm run test:e2e

import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/', link: 'Home', heading: 'Puzzle Pocket' },
  { path: '/how-to-play.html', link: 'How to Play', heading: 'How to play' },
  { path: '/support.html', link: 'Support', heading: 'Support' },
  { path: '/privacy.html', link: 'Privacy', heading: 'Privacy' },
  { path: '/contact.html', link: 'Contact', heading: 'Contact us' },
];

const mainNav = (page) => page.getByRole('navigation', { name: 'Main' });

test.describe('Navigation', () => {
  for (const from of PAGES) {
    test(`every page can be reached in one click from ${from.path}`, async ({ page }) => {
      for (const to of PAGES) {
        await page.goto(from.path);
        await mainNav(page).getByRole('link', { name: to.link, exact: true }).click();
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(to.heading);
      }
    });
  }

  test('the current page is marked with aria-current and does not rely on color alone', async ({ page }) => {
    for (const { path, link } of PAGES) {
      await page.goto(path);
      const current = mainNav(page).locator('[aria-current="page"]');
      await expect(current).toHaveCount(1);
      await expect(current).toHaveText(link);
      await expect(current).toHaveCSS('font-weight', '700');
      await expect(current).toHaveCSS('text-decoration-line', 'underline');
    }
  });

  test('the footer links to Support, Privacy, and Contact on every page', async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      const footer = page.getByRole('navigation', { name: 'Footer' });
      for (const name of ['Support', 'Privacy', 'Contact']) {
        await expect(footer.getByRole('link', { name })).toBeVisible();
      }
    }
  });
});

test.describe('Screen sizes and accessibility', () => {
  test('no page scrolls sideways at 320 pixels wide', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    for (const { path } of PAGES) {
      await page.goto(path);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(width, path).toBeLessThanOrEqual(320);
    }
  });

  test('every image has alt text, and every mockup is labeled as an early design', async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      for (const image of await page.locator('img').all()) {
        expect(await image.getAttribute('alt'), path).not.toBeNull();
      }
    }
    await page.goto('/');
    const mockups = page.locator('figure.mockup');
    await expect(mockups).toHaveCount(3);
    for (const mockup of await mockups.all()) {
      await expect(mockup).toContainText('Early design. The finished game may look different.');
      expect((await mockup.locator('img').getAttribute('alt')).length).toBeGreaterThan(20);
    }
  });

  test('the skip link is the first thing the keyboard reaches, and jumps to the main content', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: 'Skip to main content' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
  });

  test('body text is at least 16 pixels tall', async ({ page }) => {
    await page.goto('/');
    const size = await page.locator('main p').first().evaluate((p) => parseFloat(getComputedStyle(p).fontSize));
    expect(size).toBeGreaterThanOrEqual(16);
  });
});

test.describe('Content, privacy, and metadata', () => {
  test('the Home page describes all three puzzles', async ({ page }) => {
    await page.goto('/');
    for (const name of ['Noughts and crosses', 'Sliding numbers', 'Word wheel']) {
      await expect(page.getByRole('heading', { level: 3, name })).toBeVisible();
    }
  });

  test('the site never claims the game is in a store yet', async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      const text = await page.locator('body').innerText();
      expect(text, path).not.toMatch(/download now|available now|get it on google play|download on the app store/i);
    }
  });

  test('no page requests anything from another server', async ({ page, baseURL }) => {
    const siteHost = new URL(baseURL).host;
    const otherHosts = new Set();
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (url.protocol.startsWith('http') && url.host !== siteHost) otherHosts.add(url.host);
    });
    for (const { path } of PAGES) {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
    }
    expect([...otherHosts]).toEqual([]);
  });

  test('no page contains placeholder text', async ({ page }) => {
    for (const { path } of PAGES) {
      await page.goto(path);
      const html = await page.content();
      expect(html, path).not.toMatch(/\[PLACEHOLDER\]|\[TODO\]|lorem ipsum/i);
    }
  });

  test('every page has a unique title and a description', async ({ page }) => {
    const titles = new Set();
    for (const { path } of PAGES) {
      await page.goto(path);
      titles.add(await page.title());
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description.length, path).toBeGreaterThan(30);
      await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
    }
    expect(titles.size).toBe(PAGES.length);
  });

  test('the Support and Privacy pages open directly from their own addresses', async ({ page }) => {
    for (const [path, heading] of [['/support.html', 'Support'], ['/privacy.html', 'Privacy']]) {
      const response = await page.goto(path);
      expect(response.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    }
  });
});
