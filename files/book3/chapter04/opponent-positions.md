# Test positions for the computer opponent

Board positions, described in words, for Codex to turn into tests of
`shared/opponent.js`. The computer always plays O. Squares are numbered like a
phone keypad, without the zero, and a dot (.) means an empty square:

```
1 | 2 | 3
--+---+--
4 | 5 | 6
--+---+--
7 | 8 | 9
```

The strategy checks these in order and takes the first move that applies:
win, block, center, corner, anything else.

In each win position, the winning square is different from the square O
would block, so a test can tell the two rules apart. Where the strategy makes
a random choice, test each position several times with different random
numbers, so a broken opponent can't pass by luck.

## Win

### 1. Win with a row, even when a block is also needed

```
O O .
X X .
. X .
```

Expected: O plays 3 and wins. X is also threatening square 6, but winning
comes before blocking.

### 2. Win with a column

```
O X .
O X .
. . X
```

Expected: O plays 7 and wins. X is also threatening square 8, but winning
comes before blocking.

### 3. Win with a diagonal

```
O X .
X O .
X . .
```

Expected: O plays 9 and wins.

## Block

### 4. Block a row

```
X X .
. O .
. . .
```

Expected: O plays 3.

### 5. Block a column, before taking the center

```
X O .
X . .
. . .
```

Expected: O plays 7. The center is empty, but blocking comes first.

### 6. Block a diagonal

```
X . .
. X .
O . .
```

Expected: O plays 9.

## Center, corner, and anything else

### 7. Take the center

X has taken a corner with the first move:

```
X . .
. . .
. . .
```

Expected: O plays 5.

### 8. Take a corner

X has taken the center with the first move:

```
. . .
. X .
. . .
```

Expected: O plays 1, 3, 7, or 9.

### 9. Take any empty square

The center and every corner are taken, and nobody can win next move:

```
X O X
. X .
O X O
```

Expected: O plays 4 or 6.

## Finished games: the computer makes no move

### 10. The player has already won

```
X X X
O O .
. . .
```

Expected: no move.

### 11. The board is full, and it's a draw

```
X O X
X O O
O X X
```

Expected: no move.

### 12. The player's move ends the game

It's X's turn:

```
X X .
O O .
. . .
```

X plays 3 and wins with the top row.

Expected: the game is won by X, and O makes no move afterward. Check that the
board still has five marks, not six.

## Undo against the computer

### 13. Undo removes both moves

The moves so far, in order: X plays 5, O plays 1, X plays 3, O plays 7.

```
O . X
. X .
O . .
```

The player taps Undo.

Expected: both O's 7 and X's 3 are removed, and it's X's turn:

```
O . .
. X .
. . .
```

### 14. Undo is disabled when there's nothing to undo

Expected: Undo isn't available at the start of a game, or after a game has
ended.

## Easy level

### 15. Easy chooses any empty square

On any board, Easy plays a random empty square, and never a taken one. Run it
on position 4 many times, and check that it sometimes plays a square other
than 3.
