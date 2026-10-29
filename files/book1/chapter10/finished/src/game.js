// The game rules for Guess My Number.
// Nothing in this file reads input, prints output, or picks random numbers
// on its own, so every rule can be tested with fixed values.

const DIFFICULTIES = [
  { choice: '1', key: 'easy', name: 'Easy', min: 1, max: 10 },
  { choice: '2', key: 'medium', name: 'Medium', min: 1, max: 50 },
  { choice: '3', key: 'hard', name: 'Hard', min: 1, max: 100 },
];

// Returns the difficulty for "1", "2", or "3", or null for anything else.
function parseDifficulty(text) {
  const answer = String(text ?? '').trim();
  return DIFFICULTIES.find((difficulty) => difficulty.choice === answer) ?? null;
}

function rangeMessage(difficulty) {
  return `Please enter a whole number from ${difficulty.min} to ${difficulty.max}.`;
}

// Checks a guess. Returns { ok: true, value } for a whole number inside the
// range, or { ok: false, message } for anything else, including 4.5.
function parseGuess(text, difficulty) {
  const answer = String(text ?? '').trim();
  if (!/^\d+$/.test(answer)) {
    return { ok: false, message: rangeMessage(difficulty) };
  }
  const value = Number(answer);
  if (value < difficulty.min || value > difficulty.max) {
    return { ok: false, message: rangeMessage(difficulty) };
  }
  return { ok: true, value };
}

// Compares a valid guess with the secret number.
function checkGuess(guess, secret) {
  if (guess < secret) return 'Higher';
  if (guess > secret) return 'Lower';
  return 'Correct';
}

function winMessage(guesses) {
  return guesses === 1 ? 'You got it in 1 guess.' : `You got it in ${guesses} guesses.`;
}

// Picks a secret number in the difficulty's range.
// random() must return a number from 0 up to (but not including) 1, like Math.random.
function pickSecret(difficulty, random = Math.random) {
  const size = difficulty.max - difficulty.min + 1;
  return difficulty.min + Math.floor(random() * size);
}

// A win is a new best score when there's no best score yet, or it took fewer guesses.
function isNewBest(guesses, bestSoFar) {
  return bestSoFar == null || guesses < bestSoFar;
}

module.exports = {
  DIFFICULTIES,
  parseDifficulty,
  parseGuess,
  checkGuess,
  winMessage,
  pickSecret,
  isNewBest,
};
