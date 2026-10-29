// Tests that play whole games, with a fixed secret number and typed answers.
// Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { play } = require('../src/index');

function tempScoresFile(t) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'guess-my-number-'));
  t.after(() => fs.rmSync(folder, { recursive: true, force: true }));
  return path.join(folder, 'best-scores.json');
}

// Plays the game with a list of answers, and returns everything it showed.
async function playWith(answers, { secret, scoresFile }) {
  const remaining = [...answers];
  const shown = [];
  const asked = [];
  await play({
    ask: async (question) => {
      asked.push(question);
      return remaining.length > 0 ? remaining.shift() : null;
    },
    say: (message) => shown.push(message),
    chooseSecret: () => secret,
    scoresFile,
  });
  return { shown, asked };
}

test('criterion 1: on Medium with a secret of 25, guesses of 10, 40, and 25 win in 3 guesses', async (t) => {
  const { shown } = await playWith(['2', '10', '40', '25', 'n'], {
    secret: 25,
    scoresFile: tempScoresFile(t),
  });
  const hints = shown.filter((line) => line === 'Higher' || line === 'Lower');
  assert.deepEqual(hints, ['Higher', 'Lower']);
  assert.ok(shown.includes('You got it in 3 guesses.'));
});

test('criterion 2: invalid guesses show the range and are not counted', async (t) => {
  const { shown } = await playWith(['2', 'abc', '', '4.5', '0', '51', '25', 'n'], {
    secret: 25,
    scoresFile: tempScoresFile(t),
  });
  const rangeMessages = shown.filter((line) => line === 'Please enter a whole number from 1 to 50.');
  assert.equal(rangeMessages.length, 5);
  assert.ok(shown.includes('You got it in 1 guess.'));
});

test('criterion 4: an invalid difficulty choice shows the options again', async (t) => {
  const { shown, asked } = await playWith(['4', 'medium', '2', '25', 'n'], {
    secret: 25,
    scoresFile: tempScoresFile(t),
  });
  const optionLists = shown.filter((line) => line === 'Choose a difficulty:');
  assert.equal(optionLists.length, 3);
  assert.equal(asked.filter((q) => q.startsWith('Your choice')).length, 3);
});

test('criterion 5: a better score shows "New best score!" and is shown after a restart', async (t) => {
  const scoresFile = tempScoresFile(t);

  const first = await playWith(['1', '1', '2', '3', 'n'], { secret: 3, scoresFile });
  assert.ok(first.shown.includes('New best score!'));

  const worse = await playWith(['1', '1', '2', '4', '3', 'n'], { secret: 3, scoresFile });
  assert.ok(!worse.shown.includes('New best score!'));

  const afterRestart = await playWith(['1', '3', 'n'], { secret: 3, scoresFile });
  assert.ok(afterRestart.shown.includes('Your best score on Easy: 3 guesses'));
  assert.ok(afterRestart.shown.includes('New best score!'));

  const finalRestart = await playWith([], { secret: 3, scoresFile });
  assert.ok(finalRestart.shown.includes('Best scores: Easy 1 guess, Medium none yet, Hard none yet'));
});

test('criterion 6: the game starts normally when best-scores.json is damaged', async (t) => {
  const scoresFile = tempScoresFile(t);
  fs.writeFileSync(scoresFile, 'broken');
  const { shown } = await playWith(['2', '25', 'n'], { secret: 25, scoresFile });
  assert.ok(shown.includes('Best scores: Easy none yet, Medium none yet, Hard none yet'));
  assert.ok(shown.includes('You got it in 1 guess.'));
});

test('criterion 7: after a win, "y" starts another game and "n" says goodbye', async (t) => {
  const { shown, asked } = await playWith(['2', '25', 'maybe', 'y', '3', '25', 'n'], {
    secret: 25,
    scoresFile: tempScoresFile(t),
  });
  assert.equal(asked.filter((q) => q === 'Play again? (y/n) ').length, 3);
  assert.ok(shown.includes('Please type y or n.'));
  assert.ok(shown.includes("Hard: I'm thinking of a whole number from 1 to 100."));
  assert.equal(shown.at(-1), 'Thanks for playing. Goodbye!');
});

test('Easy rejects a guess of 11', async (t) => {
  const { shown } = await playWith(['1', '11', '5', 'n'], {
    secret: 5,
    scoresFile: tempScoresFile(t),
  });
  assert.ok(shown.includes('Please enter a whole number from 1 to 10.'));
});
