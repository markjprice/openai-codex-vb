# Product brief: Puzzle Pocket game

## User and problem

A person with a few spare minutes wants a quick, calm puzzle on their phone,
and enjoys beating their own best times and keeping a streak going, but most
puzzle apps are full of ads, sign-ups, and purchases.

## Desired outcome

A player opens the game and is playing a puzzle within two taps. They can
see their best times and streaks, and the game remembers everything after it
closes. Nothing about the player leaves the phone.

## Product type

An installed mobile app for iPhone and Android, built with React Native and
Expo from one project. The same project runs in a web browser as a secondary
preview for development only.

## Screens and navigation

| Screen | Opened from | Way back to the hub |
| --- | --- | --- |
| Hub | The app starting | (This is the hub) |
| Noughts and crosses | Hub | Back arrow, iPhone swipe from the left edge, Android back gesture or button |
| Sliding numbers | Hub | Same as above |
| Word wheel | Hub, or tapping the daily reminder | Same as above |
| Results | Shown over a puzzle screen when a game ends | Back to hub button, or Play again |
| Stats | Hub | Same as a puzzle screen |
| Settings | Hub | Same as a puzzle screen |

There are no tabs or drawer menus. The hub is the only way to move between
puzzles.

## Features in the first release

1. A hub that shows today's word wheel and a button for each puzzle.
2. Noughts and crosses for two players on one phone, or against a simple
   computer opponent, with undo and restart.
3. A 4 by 4 sliding number puzzle with a move counter, a timer, and a shuffle
   that can always be solved.
4. A daily word wheel, the same for every player on the same day.
5. Games in progress, best times, scores, and win streaks saved on the phone.
6. A Stats screen and a Settings screen, with options to reset.
7. Light vibration feedback and optional sounds, each with an on/off setting.
8. An optional daily reminder at a time the player chooses.

## Not in the first release

- Accounts and logins
- Online multiplayer and leaderboards
- Advertising
- In-app purchases
- Analytics, crash reporting, or any service that sends data off the phone
- Real-time action games
- Syncing progress between phones
- Board sizes other than 3 by 3 and 4 by 4

## Permissions

| Feature | Permission needed? | Notes |
| --- | --- | --- |
| Saving progress on the phone | No | Apps can always store their own data |
| Vibration (haptics) | No | Players can turn it off in the game's settings |
| Sound | No | The game respects the phone's silent mode |
| Daily reminder | Yes: notifications | Ask only when the player turns the reminder on |
| Camera, microphone, location, contacts | Not used | The app must not request them |

## Information

From the game section of the website's privacy page:

- Your progress, best times, win streaks, and settings are stored only on
  your phone. We can't see them.
- The game doesn't collect names, email addresses, locations, or contacts.
- The game has no accounts, advertising, or analytics.
- Daily reminders are scheduled on your phone itself. You can turn them off
  in the game's settings or in your phone's settings.

Receives: taps on the screen, and the player's choices in Settings.

Stores: game progress, statistics, and settings, on the phone only (see
STORAGE.md from Chapter 3.7).

Shares: nothing. The game works without an internet connection.

## Shared with the website

- `shared/design-tokens.json`: colors, fonts, spacing, and corner radius.
- `shared/rules.js`: the noughts and crosses rules from the website demo.

## Acceptance criteria

1. Every screen except the hub has a way back to the hub, and both the
   iPhone swipe from the left edge and the Android back gesture work.
2. The hub shows today's word wheel and a button for each of the three
   puzzles, and opening any puzzle takes one tap.
3. Closing the app completely and opening it again restores any game in
   progress.
4. The numbers on the Stats screen match the definitions in STORAGE.md.
5. With Sound off, the game makes no sound. With Vibration off, it doesn't
   vibrate. On an iPhone in silent mode, it makes no sound.
6. The app asks for notification permission only after the player turns on
   Daily reminder and taps Continue.
7. If the player refuses permission, the reminder switch turns off, and every
   puzzle still works.
8. Every tile and button is at least 44 by 44 points.
9. Every puzzle can be played to the end with VoiceOver on iPhone and
   TalkBack on Android.
10. Text stays readable, without being cut off, at the phone's largest text
    size and in dark mode.
11. The app requests no permission other than notifications.
12. Every statement in the privacy page about the game is true.

## Noughts and crosses

Two players share one phone, or one player plays X against the computer,
which plays O. X always goes first. The rules are in `shared/rules.js`, the
same file as the website's demo. The computer's strategy is in
`shared/opponent.js`: win, block, center, corner, then any empty square.

Undo:

- Two players: Undo removes the last move.
- Against the computer: Undo removes the computer's last move and the
  player's move before it, so it's the player's turn again.
- Undo isn't available at the start of a game, or after it has ended.

Restart clears the history and starts a new game with the same mode.

## Sliding numbers

A 4 by 4 board holds tiles numbered 1 to 15 and one empty space. Tapping a
tile next to the empty space (above, below, left, or right) slides it into
the space. The puzzle is solved when the tiles read 1 to 15 in order, left
to right and top to bottom, with the empty space last.

Not in this release:

- Board sizes other than 4 by 4
- Sliding several tiles at once
- Hints or automatic solving

Acceptance criteria:

1. Tapping a tile next to the empty space moves it, and adds 1 to the
   move count.
2. Tapping any other tile does nothing, and the move count doesn't change.
3. Every new game starts from a board that can be solved.
4. A new game never starts already solved.
5. The timer starts on the first move and pauses when the app is in the
   background.
6. When the board is solved, the results dialog shows the moves and time.

## Word wheel

Seven different letters are arranged in a wheel, with one in the center.
At least one word in the word list uses all seven letters.

A valid word:

- Has at least 4 letters
- Includes the center letter
- Uses only letters from the wheel (each letter can be used more than once)
- Appears in the bundled word list
- Hasn't already been found in this game

Scoring: a 4-letter word scores 1 point. Longer words score 1 point per
letter. A word using all seven letters scores 7 bonus points.

Not in this release: hints, timed rounds, or player-added words.

Every player gets the same puzzle on the same calendar day, using the date on
their phone. Puzzles are prepared in advance by `scripts/make-daily-puzzles.mjs`.
