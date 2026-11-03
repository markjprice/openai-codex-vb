// The noughts and crosses demo on the How to Play page.
// This file draws the board and responds to players. It asks rules.js what
// each move means.

import {
  createGame,
  makeMove,
  canMove,
  statusMessage,
  squareLabel,
  moveDescription,
} from './rules.js';

const SVG_X =
  '<svg class="mark-x" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<path d="M5 5l14 14M19 5L5 19" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" fill="none"/></svg>';
const SVG_O =
  '<svg class="mark-o" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
  '<circle cx="12" cy="12" r="7.5" stroke="currentColor" stroke-width="3.5" fill="none"/></svg>';

const demo = document.querySelector('[data-demo]');

if (demo) {
  const board = demo.querySelector('[data-board]');
  const status = demo.querySelector('[data-status]');
  const restartButton = demo.querySelector('[data-restart]');

  // The demo works, so show it and hide the note about JavaScript.
  document.querySelector('[data-no-js]')?.setAttribute('hidden', '');
  demo.hidden = false;

  // Create the nine squares as buttons. Buttons already work with a mouse,
  // a touchscreen, and the Enter and Space keys.
  const squares = Array.from({ length: 9 }, (_, index) => {
    const square = document.createElement('button');
    square.type = 'button';
    square.className = 'square';
    square.dataset.index = String(index);
    board.append(square);
    return square;
  });

  let game = createGame();

  // Redraws the board and the status message.
  // lastMove is the square just played, so screen readers hear what happened.
  function render(lastMove) {
    const winningSquares = game.result?.type === 'win' ? game.result.squares : [];

    squares.forEach((square, index) => {
      const mark = game.board[index];
      square.innerHTML = mark === 'X' ? SVG_X : mark === 'O' ? SVG_O : '';
      square.setAttribute('aria-label', squareLabel(index, mark));
      square.setAttribute('aria-disabled', String(!canMove(game, index)));
      square.classList.toggle('is-winner', winningSquares.includes(index));
    });

    // The live region: screen readers announce its text whenever it changes.
    status.textContent = '';
    if (lastMove !== undefined) {
      const moveText = document.createElement('span');
      moveText.className = 'visually-hidden';
      moveText.textContent = `${moveDescription(lastMove, game.board[lastMove])} `;
      status.append(moveText);
    }
    status.append(statusMessage(game));
  }

  board.addEventListener('click', (event) => {
    const square = event.target.closest('.square');
    if (!square) return;
    const index = Number(square.dataset.index);

    // Taken squares, and every square after a win or a draw, do nothing.
    if (!canMove(game, index)) return;

    game = makeMove(game, index);
    render(index);
  });

  restartButton.addEventListener('click', () => {
    game = createGame();
    render();
    squares[0].focus();
  });

  render();
}
