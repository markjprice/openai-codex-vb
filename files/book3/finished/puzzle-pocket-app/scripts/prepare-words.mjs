// Prepares the word list for the word wheel.
// Run it with: npm run words
//
// Source: SCOWL (Spell Checker Oriented Word Lists) by Kevin Atkinson, sizes
// 10 to 35 (the "small" size), English and American spellings, from the
// wordlist-english package. License: see node_modules/wordlist-english/Copyright.
//
// Steps:
//   1. Keep only words of 4 to 12 letters, with no capitals, hyphens, or apostrophes.
//   2. Remove every word on the blocklists:
//      - The "List of Dirty, Naughty, Obscene, and Otherwise Bad Words" (English),
//        from the naughty-words package, under Creative Commons Attribution 4.0.
//      - scripts/blocklist-extra.txt, words you add yourself after reviewing puzzles.
//   3. Save the result as assets/words/words.json.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const SIZES = [10, 20, 35];
const SPELLINGS = ['english', 'american'];

let source = [];
for (const spelling of SPELLINGS) {
  for (const size of SIZES) {
    source = source.concat(require(`wordlist-english/${spelling}-words-${size}.json`));
  }
}

const blocked = new Set(
  [
    ...require('naughty-words/en.json'),
    ...readFileSync(join(root, 'scripts/blocklist-extra.txt'), 'utf8').split('\n'),
  ]
    .map((line) => line.trim().toLowerCase())
    .filter((line) => line && !line.startsWith('#'))
);

// A word is blocked if it, or the word without a simple ending, is on a blocklist.
function isBlocked(word) {
  const forms = [word, word.replace(/s$/, ''), word.replace(/es$/, ''), word.replace(/ed$/, ''), word.replace(/ing$/, '')];
  return forms.some((form) => blocked.has(form));
}

const kept = new Set();
let removedByBlocklist = 0;
for (const word of source) {
  if (!/^[a-z]{4,12}$/.test(word)) continue;
  if (isBlocked(word)) {
    removedByBlocklist++;
    continue;
  }
  kept.add(word);
}

const words = [...kept].sort();
mkdirSync(join(root, 'assets/words'), { recursive: true });
writeFileSync(join(root, 'assets/words/words.json'), JSON.stringify(words) + '\n');

console.log(`Read ${source.length} words from SCOWL sizes ${SIZES.join(', ')}.`);
console.log(`Removed ${removedByBlocklist} words on a blocklist.`);
console.log(`Saved ${words.length} words of 4 to 12 letters to assets/words/words.json.`);
