# Test positions for the noughts and crosses rules

Ten board positions, described in words, for Codex to turn into tests.
Squares are numbered like a phone keypad, without the zero:

```
1 | 2 | 3
--+---+--
4 | 5 | 6
--+---+--
7 | 8 | 9
```

A dot (.) means an empty square.

## Wins on every kind of line

### 1. X wins with the top row

X in the top row, O in two middle squares: X has won.

```
X X X
O O .
. . .
```

Expected: X wins with the top row. Winning squares: 1, 2, 3.

### 2. O wins with the middle row

```
X . X
O O O
X . .
```

Expected: O wins with the middle row. Winning squares: 4, 5, 6.

### 3. X wins with the left column

```
X O .
X O .
X . .
```

Expected: X wins with the left column. Winning squares: 1, 4, 7.

### 4. O wins with the right column

```
X X O
. X O
. . O
```

Expected: O wins with the right column. Winning squares: 3, 6, 9.

### 5. X wins with the diagonal from the top left

```
X O O
. X .
. . X
```

Expected: X wins with the diagonal from the top left. Winning squares: 1, 5, 9.

### 6. O wins with the diagonal from the top right

```
X X O
X O .
O . .
```

Expected: O wins with the diagonal from the top right. Winning squares: 3, 5, 7.

## Draws and the ninth move

### 7. A full board with no winner is a draw

```
X O X
X O O
O X X
```

Expected: nobody wins, and the game is a draw.

### 8. A ninth move that wins is a win, not a draw

Before the last move, X and O have each played four times, and it's X's turn:

```
X O X
O X O
O X .
```

X plays square 9. The board is now full:

```
X O X
O X O
O X X
```

Expected: X wins with the diagonal from the top left (squares 1, 5, 9), and
the game is **not** reported as a draw.

## Moves that must do nothing

### 9. Choosing a square that's already taken

It's X's turn on this board:

```
X . .
. O .
. . .
```

X chooses square 5, which O already has.

Expected: the move isn't allowed. The board doesn't change, and it's still
X's turn.

### 10. Moving after the game has ended

O has already won with the left column, and it would be X's turn:

```
O X X
O X .
O . .
```

X chooses square 9.

Expected: the move isn't allowed. The board doesn't change, and the game is
still won by O.
