// An automated accessibility scan of every page, using axe.
// It finds many WCAG 2.2 AA problems, but not all of them: you still need to
// check with a keyboard and a screen reader yourself.
// Run it with: npm run test:e2e

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/how-to-play.html', '/support.html', '/privacy.html', '/contact.html'];
const WCAG_AA = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

for (const path of PAGES) {
  test(`${path} has no detectable WCAG 2.2 AA problems`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(WCAG_AA).analyze();
    expect(results.violations).toEqual([]);
  });
}

test('the demo has no detectable problems after a win', async ({ page }) => {
  await page.goto('/how-to-play.html');
  for (const index of [0, 3, 1, 4, 2]) {
    await page.locator('[data-board] .square').nth(index).click();
  }
  const results = await new AxeBuilder({ page }).withTags(WCAG_AA).analyze();
  expect(results.violations).toEqual([]);
});

test('the contact form has no detectable problems while showing errors', async ({ page }) => {
  await page.goto('/contact.html');
  await page.getByRole('button', { name: 'Send message' }).click();
  const results = await new AxeBuilder({ page }).withTags(WCAG_AA).analyze();
  expect(results.violations).toEqual([]);
});
