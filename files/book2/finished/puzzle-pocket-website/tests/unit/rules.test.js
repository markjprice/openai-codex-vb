// Tests for the noughts and crosses rules in src/demo/rules.js.
// Each numbered test matches a position in test-positions.md.
// Run them with: npm test

import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createGame,
  findWin,
  getResult,
  canMove,
  makeMove,
  statusMessage,
  squareLabel,
} from '../../src/demo/rules.js';

// Turns three rows like 'XXX', 'OO.', '...' into a board. A dot is an empty square.
function board(...rows) {
  return rows.join('').split('').map((square) => (square === '.' ? null : square));
}

// A game in the middle of play, with the board and whose turn it is.
function gameAt(turn, ...rows) {
  const squares = board(...rows);
  return { board: squares, turn, result: getResult(squares) };
}

test('position 1: X wins with the top row', () => {
  const win = findWin(board('XXX', 'OO.', '...'));
  assert.equal(win.player, 'X');
  assert.deepEqual(win.squares, [0, 1, 2]);
  assert.equal(win.lineName, 'the top row');
});

test('position 2: O wins with the middle row', () => {
  const win = findWin(board('X.X', 'OOO', 'X..'));
  assert.equal(win.player, 'O');
  assert.deepEqual(win.squares, [3, 4, 5]);
});

test('position 3: X wins with the left column', () => {
  const win = findWin(board('XO.', 'XO.', 'X..'));
  assert.equal(win.player, 'X');
  assert.deepEqual(win.squares, [0, 3, 6]);
});

test('position 4: O wins with the right column', () => {
  const win = findWin(board('XXO', '.XO', '..O'));
  assert.equal(win.player, 'O');
  assert.deepEqual(win.squares, [2, 5, 8]);
});

test('position 5: X wins with the diagonal from the top left', () => {
  const win = findWin(board('XOO', '.X.', '..X'));
  assert.equal(win.player, 'X');
  assert.deepEqual(win.squares, [0, 4, 8]);
});

test('position 6: O wins with the diagonal from the top right', () => {
  const win = findWin(board('XXO', 'XO.', 'O..'));
  assert.equal(win.player, 'O');
  assert.deepEqual(win.squares, [2, 4, 6]);
});

test('position 7: a full board with no winner is a draw', () => {
  const result = getResult(board('XOX', 'XOO', 'OXX'));
  assert.deepEqual(result, { type: 'draw' });
  assert.equal(statusMessage({ board: [], turn: 'X', result }), "It's a draw.");
});

test('position 8: a ninth move that completes a line is a win, not a draw', () => {
  const before = gameAt('X', 'XOX', 'OXO', 'OX.');
  const after = makeMove(before, 8);
  assert.equal(after.result.type, 'win');
  assert.equal(after.result.player, 'X');
  assert.deepEqual(after.result.squares, [0, 4, 8]);
  assert.equal(statusMessage(after), 'X wins with the diagonal from the top left!');
});

test('position 9: choosing a taken square does nothing, and the turn does not change', () => {
  const before = gameAt('X', 'X..', '.O.', '...');
  assert.equal(canMove(before, 4), false);
  const after = makeMove(before, 4);
  assert.deepEqual(after.board, before.board);
  assert.equal(after.turn, 'X');
});

test('position 10: no moves are possible after the game has ended', () => {
  const before = gameAt('X', 'OXX', 'OX.', 'O..');
  assert.equal(before.result.player, 'O');
  assert.equal(canMove(before, 8), false);
  const after = makeMove(before, 8);
  assert.deepEqual(after.board, before.board);
  assert.equal(after.result.player, 'O');
});

test('a new game has an empty board, and it is X\'s turn', () => {
  const game = createGame();
  assert.deepEqual(game.board, Array(9).fill(null));
  assert.equal(statusMessage(game), "X's turn");
});

test('after X moves, it is O\'s turn', () => {
  const game = makeMove(createGame(), 4);
  assert.equal(game.board[4], 'X');
  assert.equal(statusMessage(game), "O's turn");
});

test('a game played move by move announces the winner', () => {
  let game = createGame();
  for (const square of [0, 3, 1, 4, 2]) {
    game = makeMove(game, square);
  }
  assert.equal(statusMessage(game), 'X wins with the top row!');
});

test('moves outside the board are not allowed', () => {
  const game = createGame();
  for (const square of [-1, 9, 1.5, '3', undefined]) {
    assert.equal(canMove(game, square), false, `square ${square}`);
  }
});

test('each square has a label that describes its position and contents', () => {
  assert.equal(squareLabel(0, null), 'Row 1, column 1, empty');
  assert.equal(squareLabel(1, null), 'Row 1, column 2, empty');
  assert.equal(squareLabel(4, 'X'), 'Row 2, column 2, X');
  assert.equal(squareLabel(8, 'O'), 'Row 3, column 3, O');
});
