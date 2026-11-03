// Tests for the design tokens.
// Run them with: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { buildTokens } from '../../scripts/build-tokens.js';

const tokens = JSON.parse(readFileSync(new URL('../../design-tokens.json', import.meta.url), 'utf8'));
const color = tokens.color;

// The contrast ratio between two colors, from 1 (no difference) to 21 (black on white).
// This is the formula from WCAG 2.2.
function contrast(first, second) {
  const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const value = parseInt(hex.slice(i, i + 2), 16) / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

test('tokens.css is up to date with design-tokens.json (run npm run tokens if this fails)', () => {
  const current = readFileSync(new URL('../../src/styles/tokens.css', import.meta.url), 'utf8');
  assert.equal(current, buildTokens());
});

test('every text color has at least 4.5:1 contrast against its background', () => {
  const pairs = [
    ['text', 'background'],
    ['text', 'surface'],
    ['text', 'surface-tint'],
    ['text', 'accent-soft'],
    ['text', 'accent'],
    ['text-muted', 'background'],
    ['text-muted', 'surface'],
    ['primary', 'background'],
    ['primary', 'surface'],
    ['primary', 'surface-tint'],
    ['primary-strong', 'surface'],
    ['on-primary', 'primary'],
    ['on-primary', 'primary-strong'],
    ['on-primary', 'text'],
    ['error', 'surface'],
    ['error', 'background'],
    ['success', 'surface'],
  ];
  for (const [foreground, background] of pairs) {
    const ratio = contrast(color[foreground], color[background]);
    assert.ok(ratio >= 4.5, `${foreground} on ${background} is only ${ratio.toFixed(2)}:1`);
  }
});

test('focus outlines and form borders have at least 3:1 contrast', () => {
  const pairs = [
    ['primary', 'background'],
    ['primary', 'surface'],
    ['border', 'surface'],
    ['border', 'background'],
    ['on-primary', 'text'],
  ];
  for (const [foreground, background] of pairs) {
    const ratio = contrast(color[foreground], color[background]);
    assert.ok(ratio >= 3, `${foreground} on ${background} is only ${ratio.toFixed(2)}:1`);
  }
});

test('tokens are named by their job, not their appearance', () => {
  const appearanceWords = /teal|orange|red|green|blue|gray|grey|white|black/;
  for (const name of Object.keys(color)) {
    assert.doesNotMatch(name, appearanceWords, name);
  }
});

test('body text is at least 16 pixels tall', () => {
  assert.ok(parseInt(tokens.font['size-body'], 10) >= 16);
  assert.ok(parseInt(tokens.font['size-small'], 10) >= 16);
});
