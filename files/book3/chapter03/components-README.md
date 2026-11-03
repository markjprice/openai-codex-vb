# Shared components

The four components every puzzle is built from. Each one lives in its own
file in `src/components`. Every value it uses, such as a color, a size, or a
corner radius, comes from the theme, which reads `shared/design-tokens.json`.

The component gallery screen (`src/app/gallery.tsx`) shows every component
in every state listed below. It's for testing only, and isn't linked from the
hub in a build you share.

## Grid

Arranges tiles in rows and columns, and sizes them to fit the screen.

| Property | Type | Description |
| --- | --- | --- |
| `columns` | number | How many tiles across. Noughts and crosses uses 3; sliding numbers uses 4. Rows follow from the number of tiles. |
| `children` | tiles | The tiles, in order from the top left, row by row. |
| `accessibilityLabel` | text | What the grid is, such as "Noughts and crosses board". |

Behavior:

- Tiles are square, with a gap of `space-2` between them.
- Tiles grow to fill the screen width, up to a maximum size, but are never
  smaller than the 44-point touch target.
- The grid stays inside the safe area.

States to check in the gallery: 3 by 3, and 4 by 4 on the narrowest phone.

## Tile

One square in a grid.

| Property | Type | Description |
| --- | --- | --- |
| `content` | "X", "O", a number, or nothing | What the tile shows. |
| `highlighted` | true or false | Marks a tile as part of a winning line or a celebration. |
| `disabled` | true or false | The tile can't be tapped, such as after a game ends. |
| `onPress` | function | What happens when the tile is tapped. |
| `accessibilityLabel` | text | What a screen reader says, such as "Row 1, column 2, empty" or "Tile 7, row 2, column 3, can move". |

States to check in the gallery:

| State | How it looks |
| --- | --- |
| Empty | Background color, border, nothing inside |
| X | A large X in the text color |
| O | A large O in the primary color |
| Number | The number in bold, on the surface color |
| Highlighted | The accent fill and a thick outline in the text color, so it doesn't rely on color alone |
| Disabled | Unchanged in appearance, but taps do nothing, and screen readers say "dimmed" or "disabled" |

Accessibility: role `button`; state `disabled` when disabled; state `selected`
when highlighted.

## Button

The game's standard button.

| Property | Type | Description |
| --- | --- | --- |
| `label` | text | The visible text, such as New game or Undo. Screen readers read the same text. |
| `variant` | "primary" or "secondary" | Primary for the main action on a screen; secondary for everything else. |
| `onPress` | function | What happens when the button is tapped. |
| `disabled` | true or false | The button can't be tapped. |
| `accessibilityHint` | text (optional) | Extra help for screen readers, such as "Takes back your last move". |

States to check in the gallery: primary, secondary, primary disabled,
secondary disabled, and a long label at the largest text size (it should
wrap, not be cut off).

Behavior:

- At least 44 points tall, with rounded ends (`radius-button`).
- Primary: primary background, white bold text. Secondary: surface
  background, primary border and text.
- Disabled buttons are faded and announced as disabled.

## Results dialog

A message shown over a puzzle when a game ends.

| Property | Type | Description |
| --- | --- | --- |
| `visible` | true or false | Whether the dialog is showing. |
| `title` | text | The result, such as "X wins!", "It's a draw.", or "Solved!" |
| `lines` | list of text | Details, such as "87 moves" and "2:07". |
| `newBest` | text (optional) | Shown when the player beats a best score, such as "New best time!" |
| `onPlayAgain` | function | Starts a new game of the same puzzle. |
| `onBackToHub` | function | Closes the puzzle and returns to the hub. |
| `children` | buttons (optional) | Extra actions, such as Show missed words in the word wheel. |

States to check in the gallery: a win, a draw, a result with a new best
score, and a result with an extra action.

Behavior:

- Covers the puzzle with a dimmed background, so the result is the only thing
  to act on.
- Screen readers move to the dialog and read the title first.
- The Android back gesture closes the dialog and returns to the hub.
