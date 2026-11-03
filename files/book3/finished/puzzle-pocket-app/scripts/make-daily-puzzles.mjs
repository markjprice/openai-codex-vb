// Prepares a year and more of daily word wheel puzzles.
// Run it with: npm run puzzles (after npm run words)
//
// A good puzzle has:
//   - seven different letters, one of them in the center
//   - at least one word that uses all seven letters, which is an everyday word
//     (from SCOWL's most common sizes, 10 and 20)
//   - between 15 and 60 valid words in the word list
//
// The puzzles are saved in assets/words/daily-puzzles.json, in a fixed order,
// so every player gets the same puzzle on the same day (see shared/daily.js).

import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validWords } from '../shared/wordwheel.js';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const PUZZLE_COUNT = 400;
const MIN_WORDS = 15;
const MAX_WORDS = 60;

const words = JSON.parse(readFileSync(join(root, 'assets/words/words.json'), 'utf8'));
const wordList = new Set(words);

const everyday = new Set(
  [10, 20].flatMap((size) => [
    ...require(`wordlist-english/english-words-${size}.json`),
    ...require(`wordlist-english/american-words-${size}.json`),
  ])
);

// A random number generator that gives the same numbers every time,
// so running the script again produces the same puzzles.
let seed = 20261101;
function random() {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
}

function shuffled(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const distinctLetters = (word) => [...new Set(word)].sort().join('');

// Every set of seven letters that makes an everyday seven-letter word.
const letterSets = new Map();
for (const word of words) {
  const letters = distinctLetters(word);
  if (letters.length === 7 && everyday.has(word) && !letterSets.has(letters)) {
    letterSets.set(letters, word);
  }
}

const candidates = [];
for (const [letters, pangram] of letterSets) {
  // Try each letter in the center, and keep the best fit for the word range.
  const options = [...letters]
    .map((center) => ({ center, count: validWords({ letters, center }, wordList).length }))
    .filter(({ count }) => count >= MIN_WORDS && count <= MAX_WORDS);
  if (options.length === 0) continue;
  const { center, count } = options[Math.floor(random() * options.length)];
  // Arrange the six outer letters in a random order, with the center last.
  const outer = shuffled([...letters].filter((letter) => letter !== center)).join('');
  candidates.push({ letters: outer + center, center, words: count, pangram });
}

if (candidates.length < PUZZLE_COUNT) {
  throw new Error(`Only ${candidates.length} good puzzles found; need ${PUZZLE_COUNT}.`);
}

const puzzles = shuffled(candidates).slice(0, PUZZLE_COUNT);
writeFileSync(join(root, 'assets/words/daily-puzzles.json'), JSON.stringify(puzzles, null, 1) + '\n');

console.log(`Found ${candidates.length} good puzzles. Saved ${PUZZLE_COUNT} to assets/words/daily-puzzles.json.`);
console.log('The first five, to check by hand:');
for (const puzzle of puzzles.slice(0, 5)) {
  console.log(`  ${puzzle.letters.toUpperCase()} (center ${puzzle.center.toUpperCase()}): ${puzzle.words} words, including "${puzzle.pangram}"`);
}
