# Test positions for the sliding number puzzle

Boards for testing `shared/sliding.js`: legal moves, the solved check, and an
independent check of whether a board can be solved. A dot (.) is the empty
space. In code, write each board as a list of 16 numbers, left to right and
top to bottom, with 0 for the empty space.

## Legal moves

### 1. The solved board

```
 1  2  3  4
 5  6  7  8
 9 10 11 12
13 14 15  .
```

As a list: `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0`

Expected: solved, and can be solved. Only tiles 12 (above the space) and 15
(left of the space) can move.

### 2. One move from solved

```
 1  2  3  4
 5  6  7  8
 9 10 11 12
13 14  . 15
```

As a list: `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15`

Expected: not solved, but can be solved. Tiles 11 (above), 14 (left), and 15
(right) can move. Tile 12 (diagonal) and tile 1 (far away) can't. Moving tile
15 solves the board.

Use this board for the hidden testing option that starts one move from solved.

## Boards that can be solved

### 3. Nine moves from solved

```
 5  1  2  3
 9  6  7  4
13 10 11  8
 . 14 15 12
```

As a list: `5, 1, 2, 3, 9, 6, 7, 4, 13, 10, 11, 8, 0, 14, 15, 12`

Expected: can be solved. To check by hand, slide tiles 13, 9, and 5 down,
then 1, 2, and 3 left, then 4, 8, and 12 up, and the board is solved.

### 4. Reversed, with the space first

```
 . 15 14 13
12 11 10  9
 8  7  6  5
 4  3  2  1
```

As a list: `0, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1`

Expected: can be solved.

## Boards that can't be solved

### 5. Tiles 14 and 15 swapped (the famous one)

```
 1  2  3  4
 5  6  7  8
 9 10 11 12
13 15 14  .
```

As a list: `1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 14, 0`

Expected: can't be solved. No sequence of legal moves puts the tiles in order.

### 6. Tiles 1 and 2 swapped

```
 2  1  3  4
 5  6  7  8
 9 10 11 12
13 14 15  .
```

As a list: `2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0`

Expected: can't be solved. Swapping any two tiles of a board that can be
solved gives one that can't.

### 7. In order, but with the space first

```
 .  1  2  3
 4  5  6  7
 8  9 10 11
12 13 14 15
```

As a list: `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15`

Expected: can't be solved. It looks tidy, but it isn't reachable from the
solved board.

### 8. Reversed, with the space last

```
15 14 13 12
11 10  9  8
 7  6  5  4
 3  2  1  .
```

As a list: `15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0`

Expected: can't be solved. Compare it with board 4.

## The shuffle

### 9. One thousand shuffled boards

Shuffle 1,000 boards. Expected: every one can be solved, and none starts
already solved.

Then temporarily replace the shuffle with a plain random deal (the tiles in a
completely random order) and run the same test. Expected: the test fails,
because about half of randomly dealt boards can't be solved. If it passes, the
test isn't checking solvability.

### 10. Taps that don't count

On board 2, tap tile 1. Expected: the board doesn't change, and the move
count stays the same.
