// Keeps a noughts and crosses game as a list of moves, called a history,
// so moves can be undone. Like rules.js, this file knows nothing about
// screens, so it can be tested on its own.

import { createGame, makeMove } from './rules.js';

// Rebuilds the game by playing every move in the history, in order.
export function gameFromMoves(moves) {
  return moves.reduce((game, index) => makeMove(game, index), createGame());
}

// Undo is possible only during a game, after at least one move.
// It's not possible at the start, or after the game has ended.
export function canUndo(moves) {
  return moves.length > 0 && gameFromMoves(moves).result === null;
}

// Takes back the last turn.
// Two players: removes the last move.
// Against the computer: removes the computer's last move and the player's
// move before it, so it's the player's turn again. If the computer hasn't
// moved yet, removes only the player's move.
export function undoLastTurn(moves, againstComputer) {
  if (!canUndo(moves)) return moves;
  if (!againstComputer) return moves.slice(0, -1);

  // The player is always X, so it's the player's turn after an even number of moves.
  const removeCount = moves.length % 2 === 0 ? 2 : 1;
  return moves.slice(0, -removeCount);
}
