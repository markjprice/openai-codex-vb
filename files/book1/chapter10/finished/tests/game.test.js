// Tests for the game rules in src/game.js. Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  DIFFICULTIES,
  parseDifficulty,
  parseGuess,
  checkGuess,
  winMessage,
  pickSecret,
  isNewBest,
} = require('../src/game');

const medium = DIFFICULTIES.find((d) => d.key === 'medium');

test('criterion 1: with a secret of 25, guesses of 10, 40, and 25 give Higher, Lower, Correct', () => {
  assert.equal(checkGuess(10, 25), 'Higher');
  assert.equal(checkGuess(40, 25), 'Lower');
  assert.equal(checkGuess(25, 25), 'Correct');
  assert.equal(winMessage(3), 'You got it in 3 guesses.');
});

test('criterion 2: "abc", an empty line, 4.5, 0, and 51 are rejected on Medium with the allowed range', () => {
  for (const answer of ['abc', '', '4.5', '0', '51']) {
    const result = parseGuess(answer, medium);
    assert.equal(result.ok, false, `"${answer}" should be rejected`);
    assert.equal(result.message, 'Please enter a whole number from 1 to 50.');
  }
});

test('criterion 3: 1 and 50 are accepted on Medium', () => {
  assert.deepEqual(parseGuess('1', medium), { ok: true, value: 1 });
  assert.deepEqual(parseGuess('50', medium), { ok: true, value: 50 });
});

test('criterion 4: difficulty choices 1, 2, and 3 are accepted, and anything else is not', () => {
  assert.equal(parseDifficulty('1').name, 'Easy');
  assert.equal(parseDifficulty('2').name, 'Medium');
  assert.equal(parseDifficulty(' 3 ').name, 'Hard');
  for (const answer of ['0', '4', 'easy', '', '1.0']) {
    assert.equal(parseDifficulty(answer), null, `"${answer}" should not be accepted`);
  }
});

test('each difficulty uses the range in the brief', () => {
  assert.deepEqual(
    DIFFICULTIES.map((d) => [d.name, d.min, d.max]),
    [['Easy', 1, 10], ['Medium', 1, 50], ['Hard', 1, 100]]
  );
});

test('the secret number is always inside the range, including at the edges', () => {
  for (const difficulty of DIFFICULTIES) {
    assert.equal(pickSecret(difficulty, () => 0), difficulty.min);
    assert.equal(pickSecret(difficulty, () => 0.999999), difficulty.max);
  }
});

test('a win is a new best score when there is no best yet or it took fewer guesses', () => {
  assert.equal(isNewBest(5, null), true);
  assert.equal(isNewBest(4, 5), true);
  assert.equal(isNewBest(5, 5), false);
  assert.equal(isNewBest(6, 5), false);
});

test('a win in one guess says "1 guess", not "1 guesses"', () => {
  assert.equal(winMessage(1), 'You got it in 1 guess.');
});
