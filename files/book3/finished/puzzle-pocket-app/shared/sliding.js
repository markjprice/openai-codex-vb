// The rules of the sliding number puzzle.
// The board is a list of 16 numbers, read left to right and top to bottom.
// 1 to 15 are tiles, and 0 is the empty space.
//
//    1  2  3  4
//    5  6  7  8
//    9 10 11 12
//   13 14 15  .

export const SIZE = 4;

export function solvedBoard() {
  return [...Array.from({ length: SIZE * SIZE - 1 }, (_, i) => i + 1), 0];
}

export function isSolved(board) {
  return board.every((tile, index) => tile === solvedBoard()[index]);
}

const rowOf = (index) => Math.floor(index / SIZE);
const columnOf = (index) => index % SIZE;

// The squares directly above, below, left, and right of a square.
export function neighbors(index) {
  const row = rowOf(index);
  const column = columnOf(index);
  const result = [];
  if (row > 0) result.push(index - SIZE);
  if (row < SIZE - 1) result.push(index + SIZE);
  if (column > 0) result.push(index - 1);
  if (column < SIZE - 1) result.push(index + 1);
  return result;
}

// A tile can move only if it's directly next to the empty space.
export function canMove(board, index) {
  return board[index] !== 0 && neighbors(index).includes(board.indexOf(0));
}

// Returns the board after sliding the tile at index into the empty space.
// If the tile can't move, the board is returned unchanged.
export function move(board, index) {
  if (!canMove(board, index)) return board;
  const next = [...board];
  const empty = board.indexOf(0);
  next[empty] = board[index];
  next[index] = 0;
  return next;
}

// Describes a tile for screen readers, such as "Tile 7, row 2, column 3, can move".
export function tileLabel(board, index) {
  if (board[index] === 0) {
    return `Empty space, row ${rowOf(index) + 1}, column ${columnOf(index) + 1}`;
  }
  const movable = canMove(board, index) ? ', can move' : '';
  return `Tile ${board[index]}, row ${rowOf(index) + 1}, column ${columnOf(index) + 1}${movable}`;
}

// Shuffles by making random legal moves from the solved board. Every move
// could be reversed, so the result can always be solved.
// random() returns a number from 0 up to 1, like Math.random.
export function shuffle(random = Math.random, moves = 300) {
  let board;
  do {
    board = solvedBoard();
    let previousEmpty = -1;
    for (let i = 0; i < moves; i++) {
      const empty = board.indexOf(0);
      // Don't slide straight back, which would undo the last move.
      const choices = neighbors(empty).filter((index) => index !== previousEmpty);
      const tile = choices[Math.floor(random() * choices.length)];
      board = move(board, tile);
      previousEmpty = empty;
    }
  } while (isSolved(board));
  return board;
}

// Deals the tiles in a completely random order. About half of these boards
// can't be solved. It's here only so the tests can show that they'd catch it.
export function randomDeal(random = Math.random) {
  const board = solvedBoard();
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
  return board;
}

// Checks whether a board can be solved, without using the shuffle.
// Count the inversions: pairs of tiles where a larger number comes before a
// smaller one. On a 4 by 4 board, the board can be solved when the inversions
// plus the empty space's row, counted from the bottom (1 to 4), is odd.
export function isSolvable(board) {
  const tiles = board.filter((tile) => tile !== 0);
  let inversions = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > tiles[j]) inversions++;
    }
  }
  const emptyRowFromBottom = SIZE - rowOf(board.indexOf(0));
  return (inversions + emptyRowFromBottom) % 2 === 1;
}

// Formats a time in seconds as minutes and seconds, such as 2:07.
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

// Describes a time in words for screen readers, such as "2 minutes 7 seconds".
export function describeTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const parts = [];
  if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
  return parts.join(' ');
}
