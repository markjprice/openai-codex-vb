// The word list and daily puzzles, bundled with the app so the word wheel
// works without an internet connection, and no guesses are sent anywhere.
// Both files are made by the scripts in the scripts folder.

import { puzzleForDate } from '../../shared/daily.js';
import { validWords } from '../../shared/wordwheel.js';

const wordArray: string[] = require('../../assets/words/words.json');
const dailyPuzzles: { letters: string; center: string }[] = require('../../assets/words/daily-puzzles.json');

export const wordList = new Set(wordArray);

export type DailyPuzzle = {
  letters: string;
  center: string;
  number: number;
  date: string;
  answers: string[];
};

export function todaysPuzzle(date = new Date()): DailyPuzzle {
  const puzzle = puzzleForDate(dailyPuzzles, date);
  return {
    letters: puzzle.letters,
    center: puzzle.center,
    number: puzzle.number,
    date: puzzle.date,
    answers: validWords(puzzle, wordList),
  };
}
