// Tests for the word wheel rules in shared/wordwheel.js, and the choice of
// daily puzzle in shared/daily.js. They use the small list in
// tests/test-words.txt, so they run quickly and don't change when the full
// word list changes.
// Run them with: npm test

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { checkGuess, scoreWord, validWords, totalScore, MESSAGES } from '../shared/wordwheel.js';
import { dateKey, daysBetween, puzzleForDate, START_DATE } from '../shared/daily.js';

const words = new Set(
  readFileSync(join(__dirname, 'test-words.txt'), 'utf8').split('\n').map((w) => w.trim()).filter(Boolean)
);

// The test puzzle: P L A N E T S, with A in the center.
const puzzle = { letters: 'planets', center: 'a' };

describe('checking a guess, in the order of the guess table', () => {
  test('fewer than 4 letters: Too short', () => {
    expect(checkGuess('tap', puzzle, words)).toMatchObject({ ok: false, message: MESSAGES.tooShort });
  });

  test('missing the center letter: Use the center letter', () => {
    expect(checkGuess('nest', puzzle, words)).toMatchObject({ ok: false, message: MESSAGES.missingCenter });
  });

  test('a letter not in the wheel: Use only letters in the wheel', () => {
    expect(checkGuess('stamp', puzzle, words)).toMatchObject({ ok: false, message: MESSAGES.notInWheel });
  });

  test('already found: Already found', () => {
    expect(checkGuess('plant', puzzle, words, ['plant'])).toMatchObject({ ok: false, message: MESSAGES.alreadyFound });
  });

  test('not in the word list: Not in the word list', () => {
    expect(checkGuess('slap', puzzle, words)).toMatchObject({ ok: false, message: MESSAGES.notInList });
  });

  test('all checks pass: accepted, with the points scored', () => {
    expect(checkGuess('plant', puzzle, words)).toEqual({ ok: true, word: 'plant', points: 5, pangram: false });
  });

  test('checks stop at the first problem: a short word missing the center letter is Too short', () => {
    expect(checkGuess('net', puzzle, words).message).toBe(MESSAGES.tooShort);
  });

  test('letters can be used more than once', () => {
    expect(checkGuess('apple', puzzle, words)).toMatchObject({ ok: true, points: 5 });
  });

  test('guesses are not case sensitive, and spaces around them are ignored', () => {
    expect(checkGuess('  PLANT ', puzzle, words)).toMatchObject({ ok: true, word: 'plant' });
  });
});

describe('scoring', () => {
  test('a 4-letter word scores 1 point', () => {
    expect(scoreWord('pant', puzzle.letters)).toBe(1);
  });

  test('longer words score 1 point per letter', () => {
    expect(scoreWord('plant', puzzle.letters)).toBe(5);
    expect(scoreWord('planet', puzzle.letters)).toBe(6);
  });

  test('a word using all seven letters scores 7 bonus points', () => {
    expect(scoreWord('planets', puzzle.letters)).toBe(14);
    expect(checkGuess('planets', puzzle, words)).toMatchObject({ ok: true, points: 14, pangram: true });
  });

  test('the total adds up every word', () => {
    expect(totalScore(['pant', 'plant', 'planets'], puzzle.letters)).toBe(20);
  });
});

describe('missed words', () => {
  test('every valid answer is listed, and nothing else', () => {
    expect(validWords(puzzle, words)).toEqual([
      'ante', 'appeal', 'apple', 'lane', 'last', 'least', 'pale', 'panel', 'pant', 'past',
      'pastel', 'peal', 'planet', 'planets', 'plant', 'plants', 'plate', 'sale', 'salt',
      'seal', 'slate', 'stale', 'tale',
    ]);
  });
});

describe('choosing the daily puzzle', () => {
  const puzzles = [{ letters: 'aaaaaaa' }, { letters: 'bbbbbbb' }, { letters: 'ccccccc' }];

  test('the start date is puzzle number 1', () => {
    const [year, month, day] = START_DATE.split('-').map(Number);
    const today = puzzleForDate(puzzles, new Date(year, month - 1, day, 9, 0));
    expect(today).toMatchObject({ letters: 'aaaaaaa', number: 1 });
  });

  test('every time of day on the same date gives the same puzzle', () => {
    const morning = puzzleForDate(puzzles, new Date(2026, 10, 3, 0, 1));
    const night = puzzleForDate(puzzles, new Date(2026, 10, 3, 23, 59));
    expect(morning).toEqual(night);
  });

  test('the next day gives the next puzzle, and the list starts again after the last one', () => {
    expect(puzzleForDate(puzzles, new Date(2026, 10, 2)).letters).toBe('bbbbbbb');
    expect(puzzleForDate(puzzles, new Date(2026, 10, 3)).letters).toBe('ccccccc');
    expect(puzzleForDate(puzzles, new Date(2026, 10, 4)).letters).toBe('aaaaaaa');
  });

  test('dates are counted in whole days, across daylight saving changes', () => {
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2);
    expect(daysBetween('2026-10-24', '2026-10-26')).toBe(2);
    expect(dateKey(new Date(2026, 0, 5))).toBe('2026-01-05');
  });
});
