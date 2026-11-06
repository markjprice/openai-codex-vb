// Board order is left to right, top to bottom. '.' means an empty square.
// Public square numbers are 1–9, matching test-positions.md.
const lines = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9],
  [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7],
];

/**
 * Describe a board reached through normal play without changing it.
 * Returns a fresh board, currentPlayer (null when finished), winner,
 * draw, status, and the sorted, unique winningSquares (numbered 1–9).
 * Position legality beyond the board shape and mark values is not checked.
 */
export function evaluateBoard(board) {
  if (!Array.isArray(board) || board.length !== 9
    || Array.from(board).some(mark => !['.', 'X', 'O'].includes(mark))) {
    throw new TypeError('A board must contain nine squares, each with X, O, or .');
  }

  const winningLines = lines.filter(([a, b, c]) =>
    board[a - 1] !== '.' && board[a - 1] === board[b - 1] && board[a - 1] === board[c - 1]);
  const winner = winningLines.length ? board[winningLines[0][0] - 1] : null;
  // Check for a winner before a draw: the ninth move can still win.
  const draw = winner === null && !board.includes('.');
  const xCount = board.filter(mark => mark === 'X').length;
  const oCount = board.filter(mark => mark === 'O').length;
  const currentPlayer = winner || draw ? null : xCount === oCount ? 'X' : 'O';

  return {
    board: [...board],
    currentPlayer,
    winner,
    draw,
    winningSquares: [...new Set(winningLines.flat())].sort((a, b) => a - b),
    status: winner ? winner + ' wins!' : draw ? "It's a draw." : currentPlayer + "'s turn.",
  };
}

/** Start a fresh game; X always goes first. */
export function createGame() {
  return evaluateBoard(Array(9).fill('.'));
}

/** Restart returns a fresh game, with no scores or other retained state. */
export function restartGame() {
  return createGame();
}

/** Return the result of a move, or the unchanged position if not allowed. */
export function playMove(board, square) {
  const game = evaluateBoard(board);
  if (game.currentPlayer === null || !Number.isInteger(square)
    || square < 1 || square > 9 || game.board[square - 1] !== '.') {
    return game;
  }
  game.board[square - 1] = game.currentPlayer;
  return evaluateBoard(game.board);
}
