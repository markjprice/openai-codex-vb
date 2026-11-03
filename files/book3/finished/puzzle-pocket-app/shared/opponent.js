// The computer opponent for noughts and crosses.
// It checks these in order and takes the first move that applies:
//   1. Win:    complete its own line.
//   2. Block:  take the square where the player would complete a line.
//   3. Center: take the center square.
//   4. Corner: take an empty corner.
//   5. Anything else: take any empty square.
// The Easy level chooses any empty square at random.

import { emptySquares, findWin } from './rules.js';

const CENTER = 4;
const CORNERS = [0, 2, 6, 8];

// Returns a square that would complete a line for player, or null.
function winningSquare(board, player) {
  for (const index of emptySquares(board)) {
    const next = [...board];
    next[index] = player;
    if (findWin(next)?.player === player) return index;
  }
  return null;
}

// Picks one item from a list. random() returns a number from 0 up to 1, like Math.random.
function pick(list, random) {
  return list[Math.floor(random() * list.length)];
}

// Chooses the computer's move. Returns a square from 0 to 8, or null when
// the game has already ended.
export function chooseMove(game, { level = 'normal', random = Math.random } = {}) {
  if (game.result !== null) return null;

  const empty = emptySquares(game.board);
  if (empty.length === 0) return null;
  if (level === 'easy') return pick(empty, random);

  const me = game.turn;
  const player = me === 'X' ? 'O' : 'X';

  const win = winningSquare(game.board, me);
  if (win !== null) return win;

  const block = winningSquare(game.board, player);
  if (block !== null) return block;

  if (game.board[CENTER] === null) return CENTER;

  const corners = CORNERS.filter((index) => game.board[index] === null);
  if (corners.length > 0) return pick(corners, random);

  return pick(empty, random);
}
