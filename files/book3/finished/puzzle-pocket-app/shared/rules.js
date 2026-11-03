// The rules of noughts and crosses.
// This file knows nothing about buttons or screens, so the rules can be
// tested on their own, and reused in the game in Book 3.
//
// The board is a list of nine squares, numbered 0 to 8 from the top left:
//
//   0 | 1 | 2
//   3 | 4 | 5
//   6 | 7 | 8
//
// Each square holds 'X', 'O', or null (empty).

export const LINES = [
  { squares: [0, 1, 2], name: 'the top row' },
  { squares: [3, 4, 5], name: 'the middle row' },
  { squares: [6, 7, 8], name: 'the bottom row' },
  { squares: [0, 3, 6], name: 'the left column' },
  { squares: [1, 4, 7], name: 'the middle column' },
  { squares: [2, 5, 8], name: 'the right column' },
  { squares: [0, 4, 8], name: 'the diagonal from the top left' },
  { squares: [2, 4, 6], name: 'the diagonal from the top right' },
];

// A new game: an empty board, and X goes first.
export function createGame() {
  return { board: Array(9).fill(null), turn: 'X', result: null };
}

// Returns the winning player and line, or null if nobody has three in a row.
export function findWin(board) {
  for (const line of LINES) {
    const [a, b, c] = line.squares;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], squares: line.squares, lineName: line.name };
    }
  }
  return null;
}

export function isFull(board) {
  return board.every((square) => square !== null);
}

// Checks for a win before a draw, so a ninth move that completes a line wins.
export function getResult(board) {
  const win = findWin(board);
  if (win) return { type: 'win', ...win };
  if (isFull(board)) return { type: 'draw' };
  return null;
}

// A move is allowed only on an empty square, while the game is still going.
export function canMove(game, index) {
  return (
    game.result === null &&
    Number.isInteger(index) &&
    index >= 0 &&
    index < 9 &&
    game.board[index] === null
  );
}

// Returns the game after the current player chooses a square.
// If the move isn't allowed, the game is returned unchanged.
export function makeMove(game, index) {
  if (!canMove(game, index)) return game;

  const board = [...game.board];
  board[index] = game.turn;
  const result = getResult(board);
  const turn = result ? game.turn : game.turn === 'X' ? 'O' : 'X';
  return { board, turn, result };
}

// The message shown above the board.
export function statusMessage(game) {
  if (game.result?.type === 'win') {
    return `${game.result.player} wins with ${game.result.lineName}!`;
  }
  if (game.result?.type === 'draw') {
    return "It's a draw.";
  }
  return `${game.turn}'s turn`;
}

// Describes a square for screen readers, such as "Row 1, column 2, empty".
export function squareLabel(index, mark) {
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  return `Row ${row}, column ${column}, ${mark ?? 'empty'}`;
}

// Describes a move for screen readers, such as "X in row 1, column 2."
export function moveDescription(index, player) {
  const row = Math.floor(index / 3) + 1;
  const column = (index % 3) + 1;
  return `${player} in row ${row}, column ${column}.`;
}

// Added in Book 3: the squares that are still empty, in order.
export function emptySquares(board) {
  return board.flatMap((square, index) => (square === null ? [index] : []));
}
