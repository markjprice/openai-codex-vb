// Generates src/styles/tokens.css from design-tokens.json.
// Run it with: npm run tokens
//
// design-tokens.json is the source of truth. Don't edit tokens.css by hand:
// change design-tokens.json, then run this script again.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const TOKENS_FILE = resolve(root, 'design-tokens.json');
const CSS_FILE = resolve(root, 'src/styles/tokens.css');

// Font names that contain spaces need quotes in CSS.
const FONT_NAMES = ['font-body'];

export function tokensToCss(tokens) {
  const lines = [
    '/* Generated from design-tokens.json by npm run tokens. Don\'t edit this file by hand. */',
    '',
    ':root {',
  ];
  for (const [group, values] of Object.entries(tokens)) {
    for (const [key, value] of Object.entries(values)) {
      const name = `${group}-${key}`;
      const cssValue = FONT_NAMES.includes(name) ? `"${value}"` : value;
      lines.push(`  --${name}: ${cssValue};`);
    }
  }
  lines.push('}', '');
  return lines.join('\n');
}

export function buildTokens() {
  const tokens = JSON.parse(readFileSync(TOKENS_FILE, 'utf8'));
  return tokensToCss(tokens);
}

// Write the file only when this script is run directly, not when a test imports it.
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  writeFileSync(CSS_FILE, buildTokens());
  console.log('Wrote src/styles/tokens.css from design-tokens.json.');
}
