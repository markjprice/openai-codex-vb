// Saves and loads the best score for each difficulty.
// Scores are stored in a small JSON file, such as:
//   { "easy": 3, "medium": 6, "hard": null }

const fs = require('node:fs');
const { DIFFICULTIES } = require('./game');

function emptyScores() {
  const scores = {};
  for (const difficulty of DIFFICULTIES) {
    scores[difficulty.key] = null;
  }
  return scores;
}

// Reads the best scores. If the file is missing or damaged, every best score
// is treated as empty, and the game carries on normally.
function loadBestScores(file) {
  const scores = emptyScores();
  let saved;
  try {
    saved = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return scores;
  }
  if (saved === null || typeof saved !== 'object') {
    return scores;
  }
  for (const key of Object.keys(scores)) {
    const value = saved[key];
    if (Number.isInteger(value) && value > 0) {
      scores[key] = value;
    }
  }
  return scores;
}

function saveBestScores(file, scores) {
  fs.writeFileSync(file, JSON.stringify(scores, null, 2) + '\n', 'utf8');
}

module.exports = { loadBestScores, saveBestScores, emptyScores };
