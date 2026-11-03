// Checks the colors in shared/design-tokens.json, in light and dark mode,
// against the WCAG 2.2 AA contrast rules from Chapter 2.6.
// Run it with: npm test

import tokens from '../shared/design-tokens.json';

// The contrast ratio between two colors, from 1 (no difference) to 21 (black on white).
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

const TEXT_PAIRS = [
  ['text', 'background'],
  ['text', 'surface'],
  ['text', 'surface-tint'],
  ['text-muted', 'background'],
  ['text-muted', 'surface'],
  ['primary', 'background'],
  ['primary', 'surface'],
  ['on-primary', 'primary'],
];

const OUTLINE_PAIRS = [
  ['border', 'background'],
  ['border', 'surface'],
  ['primary', 'surface'],
];

describe.each([
  ['light mode', tokens.color],
  ['dark mode', tokens['color-dark']],
])('%s', (mode, colors) => {
  test.each(TEXT_PAIRS)('%s on %s has at least 4.5:1 contrast', (foreground, background) => {
    expect(contrast(colors[foreground], colors[background])).toBeGreaterThanOrEqual(4.5);
  });

  test.each(OUTLINE_PAIRS)('%s on %s has at least 3:1 contrast', (foreground, background) => {
    expect(contrast(colors[foreground], colors[background])).toBeGreaterThanOrEqual(3);
  });

  test('dark text on the accent color (highlighted tiles, the center letter) has at least 4.5:1 contrast', () => {
    expect(contrast(tokens.color.text, colors.accent)).toBeGreaterThanOrEqual(4.5);
  });
});

test('dark mode has a dark version of every color', () => {
  expect(Object.keys(tokens['color-dark']).sort()).toEqual(Object.keys(tokens.color).sort());
});
