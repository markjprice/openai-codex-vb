# Product brief: Guess My Number

## User and problem

A person with a spare minute wants a quick puzzle, and enjoys trying to
beat their own record.

## Desired outcome

A complete game takes under two minutes, and the player can see whether
they beat their best score.

## Product type

A script that runs in a terminal window.

## Game rules

- The computer picks a secret whole number within the chosen range.
- After each valid guess, the game says "Higher" if the secret number is
  higher, or "Lower" if it is lower.
- Only valid guesses count toward the score.
- The game ends when the player guesses the secret number.

## Features in the first release

1. Choose a difficulty: Easy (1 to 10), Medium (1 to 50), or Hard (1 to 100).
2. Guess with higher and lower hints until correct.
3. See the number of guesses taken.
4. Save and show the best score for each difficulty.
5. Choose whether to play again.

## Not in the first release

- Timers, extra hints, or a limit on guesses
- Two-player games or online leaderboards
- Colors, sound, or graphics

## Information

Receives: a difficulty choice and guesses typed by the player.

Stores: the best score for each difficulty, in best-scores.json in the
project folder.

Shares: nothing. The game never connects to the internet.

## Acceptance criteria

1. On Medium with a secret of 25, guesses of 10, 40, and 25 produce
   "Higher", "Lower", and a win message saying "You got it in 3 guesses."
2. On Medium, guesses of "abc", an empty line, 4.5, 0, and 51 each show a
   message giving the allowed range, and don't count as guesses.
3. On Medium, guesses of 1 and 50 are accepted as valid.
4. Choosing a difficulty accepts 1, 2, or 3. Anything else shows the
   options again.
5. When a win beats the saved best score for that difficulty, the game
   shows "New best score!" and saves it. After restarting, the new best
   score is shown.
6. If best-scores.json is missing or damaged, the game starts normally
   and treats every best score as empty.
7. After a win, the game asks "Play again? (y/n)". Typing n ends the game
   with a goodbye message.
