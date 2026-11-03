// Tests for the sliding number puzzle rules in shared/sliding.js.
// The numbered tests match the boards in sliding-positions.md.
// Run them with: npm test

import {
  solvedBoard,
  isSolved,
  canMove,
  move,
  shuffle,
  isSolvable,
  tileLabel,
  formatTime,
  describeTime,
} from '../shared/sliding.js';

const BOARDS = {
  solved: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
  oneMoveFromSolved: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15],
  nineMovesFromSolved: [5, 1, 2, 3, 9, 6, 7, 4, 13, 10, 11, 8, 0, 14, 15, 12],
  reversedSpaceFirst: [0, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
  swap14and15: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0],
  swap1and2: [2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
  inOrderSpaceFirst: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  reversedSpaceLast: [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
};

const movableTiles = (board) => board.filter((tile, index) => canMove(board, index));

// A random number generator that gives the same numbers every time, so a
// failing test can be repeated exactly.
function seededRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

describe('legal moves', () => {
  test('board 1: the solved board is solved, and only tiles 12 and 15 can move', () => {
    expect(isSolved(BOARDS.solved)).toBe(true);
    expect(isSolved(solvedBoard())).toBe(true);
    expect(movableTiles(BOARDS.solved).sort((a, b) => a - b)).toEqual([12, 15]);
  });

  test('board 2: tiles next to the space can move; diagonal and distant tiles cannot', () => {
    const board = BOARDS.oneMoveFromSolved;
    expect(isSolved(board)).toBe(false);
    expect(movableTiles(board).sort((a, b) => a - b)).toEqual([11, 14, 15]);
    expect(canMove(board, board.indexOf(12))).toBe(false);
    expect(canMove(board, board.indexOf(1))).toBe(false);
  });

  test('board 2: moving tile 15 solves the board', () => {
    const board = BOARDS.oneMoveFromSolved;
    expect(isSolved(move(board, board.indexOf(15)))).toBe(true);
  });

  test('board 10: tapping a tile that cannot move leaves the board unchanged', () => {
    const board = BOARDS.oneMoveFromSolved;
    expect(move(board, board.indexOf(1))).toBe(board);
  });

  test('board 3: the nine slides described in sliding-positions.md solve it', () => {
    let board = BOARDS.nineMovesFromSolved;
    // Slide 13, 9, and 5 down; then 1, 2, and 3 left; then 4, 8, and 12 up.
    for (const tile of [13, 9, 5, 1, 2, 3, 4, 8, 12]) {
      expect(canMove(board, board.indexOf(tile))).toBe(true);
      board = move(board, board.indexOf(tile));
    }
    expect(isSolved(board)).toBe(true);
  });

  test('each tile has a label with its number, position, and whether it can move', () => {
    const board = BOARDS.oneMoveFromSolved;
    expect(tileLabel(board, board.indexOf(15))).toBe('Tile 15, row 4, column 4, can move');
    expect(tileLabel(board, board.indexOf(1))).toBe('Tile 1, row 1, column 1');
    expect(tileLabel(board, board.indexOf(0))).toBe('Empty space, row 4, column 3');
  });
});

describe('the independent solvability check', () => {
  test.each([
    ['board 1, solved', BOARDS.solved],
    ['board 2, one move from solved', BOARDS.oneMoveFromSolved],
    ['board 3, nine moves from solved', BOARDS.nineMovesFromSolved],
    ['board 4, reversed with the space first', BOARDS.reversedSpaceFirst],
  ])('%s can be solved', (name, board) => {
    expect(isSolvable(board)).toBe(true);
  });

  test.each([
    ['board 5, tiles 14 and 15 swapped', BOARDS.swap14and15],
    ['board 6, tiles 1 and 2 swapped', BOARDS.swap1and2],
    ['board 7, in order with the space first', BOARDS.inOrderSpaceFirst],
    ['board 8, reversed with the space last', BOARDS.reversedSpaceLast],
  ])('%s cannot be solved', (name, board) => {
    expect(isSolvable(board)).toBe(false);
  });
});

describe('the shuffle', () => {
  test('board 9: 1,000 shuffled boards can all be solved, and none starts solved', () => {
    const random = seededRandom(2026);
    for (let i = 0; i < 1000; i++) {
      const board = shuffle(random);
      expect([...board].sort((a, b) => a - b)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      expect(isSolvable(board)).toBe(true);
      expect(isSolved(board)).toBe(false);
    }
  });
});

describe('time', () => {
  test('times are shown as minutes and seconds', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(127)).toBe('2:07');
    expect(formatTime(3600)).toBe('60:00');
  });

  test('times are described in words for screen readers', () => {
    expect(describeTime(127)).toBe('2 minutes 7 seconds');
    expect(describeTime(61)).toBe('1 minute 1 second');
    expect(describeTime(45)).toBe('45 seconds');
  });
});
