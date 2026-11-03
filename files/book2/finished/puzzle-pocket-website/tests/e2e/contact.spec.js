// Browser tests for the contact form.
// Sending only works on the published site, so these tests check everything
// that happens before a message is sent.
// Run them with: npm run test:e2e

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/contact.html');
});

const summary = (page) => page.locator('[data-error-summary]');
const send = (page) => page.getByRole('button', { name: 'Send message' });

test('pressing Send with every field empty shows an error summary, and moves focus to it', async ({ page }) => {
  await send(page).click();
  await expect(summary(page)).toBeVisible();
  await expect(summary(page)).toBeFocused();
  await expect(summary(page).getByRole('link')).toHaveText([
    'Enter your email address, so we can reply.',
    'Enter a message, up to 2,000 characters.',
  ]);
  await expect(page.locator('#email-error')).toContainText('Enter your email address, so we can reply.');
  await expect(page.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true');
});

test('an email address in the wrong format is rejected, and what was typed is kept', async ({ page }) => {
  await page.getByLabel('Name (optional)').fill('Sam');
  await page.getByLabel('Email address').fill('sam.example.com');
  await page.getByLabel('Message').fill('How do I reset my progress?');
  await send(page).click();
  await expect(summary(page).getByRole('link')).toHaveText([
    'Enter an email address in the correct format, like name@example.com.',
  ]);
  await expect(page.getByLabel('Name (optional)')).toHaveValue('Sam');
  await expect(page.getByLabel('Message')).toHaveValue('How do I reset my progress?');
});

test('a message over 2,000 characters is rejected', async ({ page }) => {
  await page.getByLabel('Email address').fill('sam@example.com');
  await page.getByLabel('Message').fill('a'.repeat(2001));
  await send(page).click();
  await expect(summary(page).getByRole('link')).toHaveText([
    'Shorten your message to 2,000 characters or fewer.',
  ]);
});

test('each link in the error summary moves focus to its field', async ({ page }) => {
  await send(page).click();
  await summary(page).getByRole('link', { name: /Enter a message/ }).click();
  await expect(page.getByLabel('Message')).toBeFocused();
});

test('the errors can be found and fixed with the keyboard alone', async ({ page }) => {
  await page.getByLabel('Message').focus();
  await page.keyboard.press('Tab');
  await expect(send(page)).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(summary(page)).toBeFocused();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(page.getByLabel('Email address')).toBeFocused();
});

test('the form asks for nothing beyond a name, email address, topic, and message', async ({ page }) => {
  const names = await page.locator('form [name]').evaluateAll((fields) => fields.map((field) => field.name));
  expect(names.sort()).toEqual(['bot-field', 'email', 'form-name', 'message', 'name', 'topic']);
});

test('the form has the attributes Netlify Forms needs, and the honeypot is hidden', async ({ page }) => {
  const form = page.locator('form[name="contact"]');
  await expect(form).toHaveAttribute('data-netlify', 'true');
  await expect(form).toHaveAttribute('netlify-honeypot', 'bot-field');
  await expect(page.locator('input[name="form-name"]')).toHaveValue('contact');
  await expect(page.locator('input[name="bot-field"]')).toBeHidden();
});

test('when a message can\'t be sent, the visitor is told and keeps what they typed', async ({ page }) => {
  await page.route('**/', (route) =>
    route.request().method() === 'POST' ? route.fulfill({ status: 500 }) : route.continue()
  );
  await page.getByLabel('Email address').fill('sam@example.com');
  await page.getByLabel('Message').fill('Hello');
  await send(page).click();
  await expect(page.getByText("Your message wasn't sent.")).toBeVisible();
  await expect(page.getByLabel('Message')).toHaveValue('Hello');
});

test('when a message is sent, the visitor sees a confirmation', async ({ page }) => {
  await page.route('**/', (route) =>
    route.request().method() === 'POST' ? route.fulfill({ status: 200, body: '' }) : route.continue()
  );
  await page.getByLabel('Email address').fill('sam@example.com');
  await page.getByLabel('Message').fill('Hello');
  await send(page).click();
  await expect(page.getByText('Thanks, your message has been sent.')).toBeVisible();
});
