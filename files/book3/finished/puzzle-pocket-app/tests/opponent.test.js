// Tests for the computer opponent (shared/opponent.js) and undo (shared/history.js).
// Each numbered test matches a position in opponent-positions.md.
// Run them with: npm test

import { getResult, makeMove } from '../shared/rules.js';
import { chooseMove } from '../shared/opponent.js';
import { gameFromMoves, undoLastTurn, canUndo } from '../shared/history.js';

// Turns three rows like 'OO.', 'XX.', 'X..' into a game where it's O's turn.
function oToMove(...rows) {
  const board = rows.join('').split('').map((square) => (square === '.' ? null : square));
  return { board, turn: 'O', result: getResult(board) };
}

// Squares in the positions file are numbered 1 to 9. The code uses 0 to 8.
const square = (number) => number - 1;

// The opponent makes some random choices. Check each position with several
// different random numbers, so a test can't pass by luck: a broken opponent
// that picks a random corner would sometimes pick the right square.
const RANDOM_CHOICES = [() => 0, () => 0.34, () => 0.67, () => 0.99];

function expectMove(game, expected) {
  for (const random of RANDOM_CHOICES) {
    expect(chooseMove(game, { random })).toBe(expected);
  }
}

describe('win', () => {
  test('position 1: wins with a row, even when a block is also needed', () => {
    expectMove(oToMove('OO.', 'XX.', '.X.'), square(3));
  });

  test('position 2: wins with a column, even when a block is also needed', () => {
    expectMove(oToMove('OX.', 'OX.', '..X'), square(7));
  });

  test('position 3: wins with a diagonal', () => {
    expectMove(oToMove('OX.', 'XO.', 'X..'), square(9));
  });
});

describe('block', () => {
  test('position 4: blocks a row', () => {
    expectMove(oToMove('XX.', '.O.', '...'), square(3));
  });

  test('position 5: blocks a column, before taking the center', () => {
    expectMove(oToMove('XO.', 'X..', '...'), square(7));
  });

  test('position 6: blocks a diagonal', () => {
    expectMove(oToMove('X..', '.X.', 'O..'), square(9));
  });
});

describe('center, corner, and anything else', () => {
  test('position 7: takes the center when it is free', () => {
    expectMove(oToMove('X..', '...', '...'), square(5));
  });

  test('position 8: takes a corner when the center is taken', () => {
    for (const random of [() => 0, () => 0.3, () => 0.6, () => 0.99]) {
      expect([1, 3, 7, 9].map(square)).toContain(chooseMove(oToMove('...', '.X.', '...'), { random }));
    }
  });

  test('position 9: takes any empty square when nothing else applies', () => {
    for (const random of [() => 0, () => 0.99]) {
      expect([4, 6].map(square)).toContain(chooseMove(oToMove('XOX', '.X.', 'OXO'), { random }));
    }
  });
});

describe('finished games', () => {
  test('position 10: makes no move when the player has already won', () => {
    expect(chooseMove(oToMove('XXX', 'OO.', '...'))).toBeNull();
  });

  test('position 11: makes no move when the board is full', () => {
    expect(chooseMove(oToMove('XOX', 'XOO', 'OXX'))).toBeNull();
  });

  test("position 12: makes no move after the player's move ends the game", () => {
    const before = { ...oToMove('XX.', 'OO.', '...'), turn: 'X' };
    const afterPlayer = makeMove(before, square(3));
    expect(afterPlayer.result.player).toBe('X');
    expect(chooseMove(afterPlayer)).toBeNull();
    expect(afterPlayer.board.filter(Boolean)).toHaveLength(5);
  });
});

describe('undo', () => {
  test('position 13: undo against the computer removes both moves, and it is X\'s turn', () => {
    const moves = [5, 1, 3, 7].map(square);
    const after = undoLastTurn(moves, true);
    expect(after).toEqual([5, 1].map(square));
    expect(gameFromMoves(after).turn).toBe('X');
  });

  test('undo against the computer before it has moved removes only the player\'s move', () => {
    expect(undoLastTurn([square(5)], true)).toEqual([]);
  });

  test('undo in a two-player game removes only the last move', () => {
    expect(undoLastTurn([4, 0, 2], false)).toEqual([4, 0]);
  });

  test('position 14: undo is not available at the start, or after the game has ended', () => {
    expect(canUndo([])).toBe(false);
    const won = [0, 3, 1, 4, 2];
    expect(gameFromMoves(won).result.type).toBe('win');
    expect(canUndo(won)).toBe(false);
    expect(undoLastTurn(won, false)).toBe(won);
  });
});

describe('easy level', () => {
  test('position 15: easy plays a random empty square, and sometimes misses the block', () => {
    const game = oToMove('XX.', '.O.', '...');
    const chosen = new Set();
    for (let i = 0; i < 100; i++) {
      const move = chooseMove(game, { level: 'easy', random: () => i / 100 });
      expect(game.board[move]).toBeNull();
      chosen.add(move);
    }
    expect(chosen.size).toBeGreaterThan(1);
  });
});
