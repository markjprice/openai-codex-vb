# Guess My Number

Guess My Number is a quick puzzle game that runs in a terminal window. The
computer picks a secret whole number, and you try to guess it. After each
guess, the game tells you to go **Higher** or **Lower**. Try to win in as few
guesses as you can, and beat your best score.

## What you need

- Node.js (the LTS version). The game uses no other packages.

## Start the game

Open a terminal in this folder and type:

```
npm start
```

Then:

1. Choose a difficulty: `1` for Easy (1 to 10), `2` for Medium (1 to 50), or
   `3` for Hard (1 to 100).
2. Type a guess and press Enter. Only whole numbers inside the range count.
3. When you guess correctly, the game shows how many guesses you took, and
   tells you if it's a new best score.
4. Type `y` to play again, or `n` to stop.

**Tip**: Guess the middle of the remaining range each time. On Hard, this
wins in seven guesses or fewer.

## Run the tests

```
npm test
```

The tests choose the secret number themselves, so every result is
predictable. Each acceptance criterion in `PRODUCT-BRIEF.md` has at least one
test:

| Criterion | What it checks | Tests |
| --- | --- | --- |
| 1 | Higher, Lower, and the win message | `tests/game.test.js`, `tests/play.test.js` |
| 2 | Invalid guesses show the range and don't count | `tests/game.test.js`, `tests/play.test.js` |
| 3 | 1 and 50 are valid on Medium | `tests/game.test.js` |
| 4 | Only 1, 2, or 3 choose a difficulty | `tests/game.test.js`, `tests/play.test.js` |
| 5 | New best scores are shown and saved | `tests/scores.test.js`, `tests/play.test.js` |
| 6 | A missing or damaged scores file is ignored | `tests/scores.test.js`, `tests/play.test.js` |
| 7 | Play again, or say goodbye | `tests/play.test.js` |

## Where best scores are saved

Best scores are saved in `best-scores.json` in this folder, for example:

```json
{
  "easy": 3,
  "medium": 6,
  "hard": null
}
```

`null` means you haven't won at that level yet. If the file is deleted or
damaged, the game starts with no best scores and creates a new file after
your next win. The file is listed in `.gitignore`, so your scores aren't
saved in the project's Git history.

## How the project is organized

| File or folder | What it's for |
| --- | --- |
| `src/game.js` | The game rules: difficulty levels, checking guesses, and best scores |
| `src/scores.js` | Reading and writing `best-scores.json` |
| `src/index.js` | The user interface: asks questions and prints messages |
| `tests/` | Automated tests for every acceptance criterion |
| `PRODUCT-BRIEF.md` | What the game should do |
| `TASKS.md` | The tasks used to build it, one slice at a time |
| `AGENTS.md` | Working agreements that Codex reads before every task |

The game never connects to the internet.
