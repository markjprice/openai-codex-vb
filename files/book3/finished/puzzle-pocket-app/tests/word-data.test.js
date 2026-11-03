// Checks the prepared word list and every daily puzzle, as Chapter 3.6's
// "What to ask next" suggests. Run it again after npm run words or npm run puzzles.

import words from '../assets/words/words.json';
import puzzles from '../assets/words/daily-puzzles.json';
import blocklist from 'naughty-words/en.json';
import { validWords } from '../shared/wordwheel.js';

const wordList = new Set(words);

test('the word list has only lowercase words of 4 to 12 letters, with no duplicates', () => {
  expect(words.every((word) => /^[a-z]{4,12}$/.test(word))).toBe(true);
  expect(wordList.size).toBe(words.length);
});

test('no word on the blocklist is in the word list', () => {
  const found = blocklist.map((word) => word.toLowerCase()).filter((word) => wordList.has(word));
  expect(found).toEqual([]);
});

test('there are puzzles for more than a year', () => {
  expect(puzzles.length).toBeGreaterThanOrEqual(366);
});

test('every puzzle has seven different letters, a center letter, and 15 to 60 words', () => {
  for (const puzzle of puzzles) {
    expect(new Set(puzzle.letters).size).toBe(7);
    expect(puzzle.letters).toContain(puzzle.center);
    const count = validWords(puzzle, wordList).length;
    expect(count).toBeGreaterThanOrEqual(15);
    expect(count).toBeLessThanOrEqual(60);
  }
});

test('every puzzle has a word that uses all seven letters', () => {
  for (const puzzle of puzzles) {
    expect(wordList.has(puzzle.pangram)).toBe(true);
    expect([...puzzle.letters].every((letter) => puzzle.pangram.includes(letter))).toBe(true);
  }
});
