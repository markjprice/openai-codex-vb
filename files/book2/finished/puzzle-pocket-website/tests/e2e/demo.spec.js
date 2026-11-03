// Browser tests for the noughts and crosses demo on the How to Play page.
// Run them with: npm run test:e2e

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/how-to-play.html');
});

const squares = (page) => page.locator('[data-board] .square');
const status = (page) => page.getByRole('status');

// Plays squares in order, numbered 1 to 9 like test-positions.md.
async function play(page, ...numbers) {
  for (const number of numbers) {
    await squares(page).nth(number - 1).click();
  }
}

// Clicks a square that should do nothing. Taken squares and finished games
// are marked aria-disabled, so Playwright needs to be told to click anyway.
async function tryToPlay(page, number) {
  await squares(page).nth(number - 1).click({ force: true });
}

test('demo criterion 1: clicking an empty square places the current player\'s mark', async ({ page }) => {
  await expect(status(page)).toHaveText("X's turn");
  await play(page, 2);
  await expect(squares(page).nth(1)).toHaveAttribute('aria-label', 'Row 1, column 2, X');
  await expect(status(page)).toContainText("O's turn");
});

test('demo criterion 2: choosing a taken square does nothing, and the turn does not change', async ({ page }) => {
  await play(page, 5);
  await tryToPlay(page, 5);
  await expect(squares(page).nth(4)).toHaveAttribute('aria-label', 'Row 2, column 2, X');
  await expect(status(page)).toContainText("O's turn");
});

test('demo criterion 3: three in a row wins, and the winning squares are highlighted', async ({ page }) => {
  await play(page, 1, 4, 2, 5, 3);
  await expect(status(page)).toContainText('X wins with the top row!');
  await expect(page.locator('.square.is-winner')).toHaveCount(3);
  for (const index of [0, 1, 2]) {
    await expect(squares(page).nth(index)).toHaveClass(/is-winner/);
  }
});

test('demo criterion 3: O can win too', async ({ page }) => {
  await play(page, 1, 3, 2, 5, 9, 7);
  await expect(status(page)).toContainText('O wins with the diagonal from the top right!');
});

test('demo criterion 4: a full board with no winner is a draw', async ({ page }) => {
  // Ends as: X O X / X O O / O X X
  await play(page, 1, 2, 3, 5, 4, 6, 8, 7, 9);
  await expect(status(page)).toContainText("It's a draw.");
});

test('demo: a ninth move that completes a line is a win, not a draw', async ({ page }) => {
  // Ends as: X O X / O X O / O X X
  await play(page, 1, 2, 3, 4, 5, 6, 8, 7, 9);
  await expect(status(page)).toContainText('X wins with the diagonal from the top left!');
});

test('demo criterion 5: no moves are possible after a win', async ({ page }) => {
  await play(page, 1, 4, 2, 5, 3);
  await tryToPlay(page, 9);
  await expect(squares(page).nth(8)).toHaveAttribute('aria-label', 'Row 3, column 3, empty');
  await expect(squares(page).nth(8)).toHaveAttribute('aria-disabled', 'true');
  await expect(status(page)).toContainText('X wins with the top row!');
});

test('demo criterion 6: Restart clears the board, makes it X\'s turn, and moves focus to the first square', async ({ page }) => {
  await play(page, 1, 4, 2, 5, 3);
  await page.getByRole('button', { name: 'Restart' }).click();
  await expect(status(page)).toHaveText("X's turn");
  await expect(page.locator('.square.is-winner')).toHaveCount(0);
  for (const square of await squares(page).all()) {
    await expect(square).toHaveAttribute('aria-label', /empty$/);
  }
  await expect(squares(page).first()).toBeFocused();
});

test('demo criterion 7: the status is a live region that describes each move and the result', async ({ page }) => {
  await expect(status(page)).toHaveAttribute('aria-live', 'polite');
  await play(page, 5);
  await expect(status(page)).toHaveText("X in row 2, column 2. O's turn");
});

test('demo: a whole game can be played with the keyboard alone', async ({ page }) => {
  await squares(page).first().focus();
  // Square 1 with Enter, square 4 with Space, square 2, square 5, square 3.
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Shift+Tab');
  await page.keyboard.press('Enter');
  await expect(status(page)).toContainText('X wins with the top row!');
});

test('demo: every square is at least 44 by 44 pixels on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  for (const square of await squares(page).all()) {
    const box = await square.boundingBox();
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  }
});
