# Storage plan for Puzzle Pocket

Everything the game remembers, where it's kept, and what each statistic
means. The app must store exactly this, and nothing else. Everything here is
about the game. Nothing is about the player.

## Where data is kept

All data is saved on the phone with AsyncStorage, in five entries. Nothing is
sent anywhere. Only the files in `src/storage` read or write these entries.

| Entry | Holds |
| --- | --- |
| `puzzle-pocket:version` | The data version number |
| `puzzle-pocket:settings` | Settings |
| `puzzle-pocket:noughts` | Noughts and crosses game in progress and statistics |
| `puzzle-pocket:sliding` | Sliding numbers game in progress and statistics |
| `puzzle-pocket:wordwheel` | Word wheel progress for today and statistics |

Each entry is saved separately, so damage to one doesn't affect the others.

## What's stored

| Area | What's stored | When it changes |
| --- | --- | --- |
| Noughts and crosses | Game in progress (mode and list of moves), games played, wins against the computer, current and best win streak | After each move, and at the end of each game |
| Sliding numbers | Game in progress (board, moves, time in seconds), games solved, best time, fewest moves | After each move, and when solved |
| Word wheel | Today's date, found words, and whether the player pressed Finish; days played in a row; the last day played; best score | After each accepted word, and on Finish |
| Settings | Sound on or off, vibration on or off, reminder on or off, reminder time | When the player changes a setting |
| App | Data version number | When the stored format changes in an update |

Default settings, for a new player: Sound off, Vibration on, Daily reminder
off, reminder time 9:00 a.m.

## What each statistic means

### Noughts and crosses

- **Games played**: every game that ends with a win, a loss, or a draw, in
  either mode. A game that's restarted or left unfinished doesn't count.
- **Wins against the computer**: games against the computer that the player
  won.
- **Current win streak**: wins against the computer in a row. A loss or a draw
  against the computer sets it back to 0. Two-player games don't change it.
- **Best win streak**: the highest current win streak there has ever been.

### Sliding numbers

- **Games solved**: every board the player has solved.
- **Best time**: the shortest time for any solved board, in minutes and
  seconds. Time only counts while the game is on screen. It stops when the app
  is in the background.
- **Fewest moves**: the fewest moves for any solved board. It can come from a
  different game than the best time.

### Word wheel

- **Today's score**: the points for the words found in today's puzzle.
- **Days played in a row**: calendar days in a row, by the date on the phone,
  on which the player found at least one word. Playing again on the same day
  doesn't add to it. Missing a whole day sets it back to 1 on the next day
  played.
- **Best score**: the highest score for any single day's puzzle.

## When something goes wrong

| Situation | What the game does |
| --- | --- |
| No saved data (first time the game is opened) | Starts with empty statistics and default settings |
| Saved data | Loads it, and shows Continue on any puzzle with a game in progress |
| Damaged data (an entry can't be read) | Resets only that entry, and keeps everything else |
| A value is missing or the wrong type | Uses the default for that value only |
| No version number, but other data exists | Treats the data as version 1, the first format, and saves the version number |
| Loading takes more than a moment | Shows "Loading..." rather than a blank screen |

## Resetting

| Option | Clears | Keeps |
| --- | --- | --- |
| Reset statistics | Statistics for all three puzzles | Settings, games in progress |
| Reset everything | Statistics, games in progress, and settings | Nothing (the data version is saved again) |

Both options ask for confirmation first, and say exactly what will be lost.

## Not stored, ever

Names, email addresses, locations, contacts, device identifiers, or anything
else about the player.

## Notes for the support FAQ and privacy page

- Deleting the app deletes all of this data.
- Data saved while testing in Expo Go belongs to Expo Go, not to the installed
  app.
- Phone backups (iCloud on iPhone, Google backup on Android) may include the
  game's data, because it's stored as ordinary app data. Check this with your
  own build, and describe it accurately in the FAQ.
