// The rules of the word wheel.
// A puzzle has seven different letters. One of them is the center letter.
//
// A valid word:
//   - has at least 4 letters
//   - includes the center letter
//   - uses only letters from the wheel (each letter can be used more than once)
//   - appears in the word list
//   - hasn't already been found in this game
//
// Scoring: a 4-letter word scores 1 point. Longer words score 1 point per
// letter. A word using all seven letters scores 7 bonus points.

export const MIN_LENGTH = 4;
export const BONUS = 7;

// The messages for each rejected guess, checked in this order.
export const MESSAGES = {
  tooShort: 'Too short: use at least 4 letters',
  missingCenter: 'Use the center letter',
  notInWheel: 'Use only letters in the wheel',
  alreadyFound: 'Already found',
  notInList: 'Not in the word list',
};

// True when the word uses all seven letters of the wheel.
export function isPangram(word, letters) {
  return [...letters].every((letter) => word.includes(letter));
}

export function scoreWord(word, letters) {
  const base = word.length === MIN_LENGTH ? 1 : word.length;
  return base + (isPangram(word, letters) ? BONUS : 0);
}

// Checks a guess. Stops at the first problem.
// puzzle: { letters: 'abcdefg', center: 'a' }
// wordList: a Set of lowercase words
// found: a list of words already found in this game
export function checkGuess(guess, puzzle, wordList, found = []) {
  const word = guess.trim().toLowerCase();

  if (word.length < MIN_LENGTH) return { ok: false, reason: 'tooShort', message: MESSAGES.tooShort };
  if (!word.includes(puzzle.center)) {
    return { ok: false, reason: 'missingCenter', message: MESSAGES.missingCenter };
  }
  if ([...word].some((letter) => !puzzle.letters.includes(letter))) {
    return { ok: false, reason: 'notInWheel', message: MESSAGES.notInWheel };
  }
  if (found.includes(word)) return { ok: false, reason: 'alreadyFound', message: MESSAGES.alreadyFound };
  if (!wordList.has(word)) return { ok: false, reason: 'notInList', message: MESSAGES.notInList };

  const points = scoreWord(word, puzzle.letters);
  return { ok: true, word, points, pangram: isPangram(word, puzzle.letters) };
}

// Every word in the list that's a valid answer for the puzzle, in alphabetical order.
export function validWords(puzzle, wordList) {
  const answers = [];
  for (const word of wordList) {
    if (
      word.length >= MIN_LENGTH &&
      word.includes(puzzle.center) &&
      [...word].every((letter) => puzzle.letters.includes(letter))
    ) {
      answers.push(word);
    }
  }
  return answers.sort();
}

export function totalScore(words, letters) {
  return words.reduce((total, word) => total + scoreWord(word, letters), 0);
}
