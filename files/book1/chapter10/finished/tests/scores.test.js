// Tests for saving and loading best scores in src/scores.js. Run them with: npm test

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { loadBestScores, saveBestScores } = require('../src/scores');

// Each test uses its own temporary file, so the real best-scores.json is never touched.
function tempScoresFile(t) {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'guess-my-number-'));
  t.after(() => fs.rmSync(folder, { recursive: true, force: true }));
  return path.join(folder, 'best-scores.json');
}

const EMPTY = { easy: null, medium: null, hard: null };

test('criterion 5: a saved best score is read back after a restart', (t) => {
  const file = tempScoresFile(t);
  saveBestScores(file, { easy: 3, medium: null, hard: null });
  assert.deepEqual(loadBestScores(file), { easy: 3, medium: null, hard: null });
});

test('criterion 6: a missing scores file means every best score is empty', (t) => {
  const file = tempScoresFile(t);
  assert.deepEqual(loadBestScores(file), EMPTY);
});

test('criterion 6: a damaged scores file means every best score is empty', (t) => {
  const file = tempScoresFile(t);
  for (const damaged of ['broken', '', '[1, 2, 3]', 'null', '{"easy": "three"}']) {
    fs.writeFileSync(file, damaged);
    assert.deepEqual(loadBestScores(file), EMPTY, `contents: ${damaged}`);
  }
});

test('a file with a best score for only one level keeps that score', (t) => {
  const file = tempScoresFile(t);
  fs.writeFileSync(file, '{ "hard": 7 }');
  assert.deepEqual(loadBestScores(file), { easy: null, medium: null, hard: 7 });
});
