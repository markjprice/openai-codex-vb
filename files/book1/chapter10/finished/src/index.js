// The user interface for Guess My Number.
// This file reads what the player types and prints messages.
// The game rules live in game.js, and saved scores live in scores.js.

const path = require('node:path');
const readline = require('node:readline');
const {
  DIFFICULTIES,
  parseDifficulty,
  parseGuess,
  checkGuess,
  winMessage,
  pickSecret,
  isNewBest,
} = require('./game');
const { loadBestScores, saveBestScores } = require('./scores');

const SCORES_FILE = path.join(__dirname, '..', 'best-scores.json');

function describeBest(best) {
  if (best == null) return 'none yet';
  return best === 1 ? '1 guess' : `${best} guesses`;
}

// Plays games until the player says no, or the input ends.
//   ask(question)          returns what the player typed, or null when input ends
//   say(message)           shows a message
//   chooseSecret(level)    returns the secret number for a difficulty
//   scoresFile             where best scores are saved
async function play({ ask, say, chooseSecret = pickSecret, scoresFile = SCORES_FILE }) {
  say('Guess My Number');

  const bestScores = loadBestScores(scoresFile);
  say(
    'Best scores: ' +
      DIFFICULTIES.map((d) => `${d.name} ${describeBest(bestScores[d.key])}`).join(', ')
  );

  for (;;) {
    // Choose a difficulty (criterion 4)
    let difficulty = null;
    while (!difficulty) {
      say('');
      say('Choose a difficulty:');
      for (const d of DIFFICULTIES) {
        say(`  ${d.choice}) ${d.name} (${d.min} to ${d.max})`);
      }
      const answer = await ask('Your choice (1, 2, or 3): ');
      if (answer === null) return;
      difficulty = parseDifficulty(answer);
    }

    const secret = chooseSecret(difficulty);
    say('');
    say(`${difficulty.name}: I'm thinking of a whole number from ${difficulty.min} to ${difficulty.max}.`);
    say(`Your best score on ${difficulty.name}: ${describeBest(bestScores[difficulty.key])}`);

    // Guess until correct (criteria 1, 2, and 3)
    let guesses = 0;
    for (;;) {
      const answer = await ask('Your guess: ');
      if (answer === null) return;
      const guess = parseGuess(answer, difficulty);
      if (!guess.ok) {
        say(guess.message);
        continue;
      }
      guesses++;
      const result = checkGuess(guess.value, secret);
      if (result === 'Correct') break;
      say(result);
    }

    say(winMessage(guesses));

    // Save a new best score (criterion 5)
    if (isNewBest(guesses, bestScores[difficulty.key])) {
      bestScores[difficulty.key] = guesses;
      say('New best score!');
      try {
        saveBestScores(scoresFile, bestScores);
      } catch {
        say("(Your best score couldn't be saved, but you can keep playing.)");
      }
    }

    // Play again? (criterion 7)
    let again = null;
    while (again === null) {
      const answer = await ask('Play again? (y/n) ');
      if (answer === null) return;
      const reply = answer.trim().toLowerCase();
      if (reply === 'y' || reply === 'yes') again = true;
      else if (reply === 'n' || reply === 'no') again = false;
      else say('Please type y or n.');
    }
    if (!again) {
      say('Thanks for playing. Goodbye!');
      return;
    }
  }
}

// Connects play() to the terminal.
async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const lines = rl[Symbol.asyncIterator]();
  const ask = async (question) => {
    rl.setPrompt(question);
    rl.prompt();
    const { value, done } = await lines.next();
    return done ? null : value;
  };
  const say = (message) => console.log(message);

  try {
    await play({ ask, say });
  } finally {
    rl.close();
  }
}

// Start the game only when this file is run directly (npm start),
// not when the tests load it.
if (require.main === module) {
  main();
}

module.exports = { play, SCORES_FILE };
