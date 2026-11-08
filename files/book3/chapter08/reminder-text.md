# Reminder text and sound sources

Sample text for the daily reminder, written to be short and specific, without
guilt or pressure. Change it to suit your game, and keep it in one place in
the app, such as `src/reminder/text.ts`.

## Settings screen

- Switch label: **Daily reminder**
- Description under the switch: One reminder a day when a new word wheel is
  ready.
- Time setting label: **Reminder time**

## The game's own explanation (shown before the system prompt)

- Title: **Turn on daily reminders?**
- Message: We'll send one reminder a day when a new word wheel is ready. You
  can change the time or turn it off at any time.
- Buttons: **Continue** (shows the system prompt) and **Not now**

## The reminder

- Title: **Puzzle Pocket**
- Body: Today's word wheel is ready.

Avoid lines like "Don't lose your streak!" or "You haven't played today!"
Pressure might bring a player back once, but it often leads them to turn
notifications off, or to delete the game.

## Android notification channel

- Channel name: **Daily reminder**
- Channel description: One reminder a day when a new word wheel is ready.

## When permission is refused

Shown after the player taps Not now, or Don't Allow in the system prompt:

- Message: Reminders are off. You can turn on notifications for Puzzle Pocket
  in your phone's Settings.
- Button: **Open Settings** (opens the phone's settings for the app)
- Button: **OK**

## When reminders aren't available

In the web version, hide the Daily reminder setting instead of showing a
switch that does nothing.

## Testing option (remove or hide before sharing)

- Button: **Send a test reminder in 1 minute**
- Confirmation: A test reminder will arrive in about a minute. You can close
  the app.

## The hub badge

- Badge text on today's word wheel, when it hasn't been played yet today:
  **New**
- Screen reader label: Today's word wheel, new

---

## Sources of sound effects

You need three short sounds, each under a second: a move, an accepted word,
and a win. Check each sound's license yourself on its own page, and record
the sound, its source, its license, and any required credit in
ATTRIBUTIONS.md.

| Source | What it offers | License to look for |
| --- | --- | --- |
| Kenney (https://kenney.nl/assets/category:Audio) | Packs of interface and game sounds, such as "Interface Sounds" and "UI Audio" | CC0 (public domain) on each pack's page |
| OpenGameArt (https://opengameart.org) | Sounds shared by game makers | Filter by CC0, and check each sound's page |
| Freesound (https://freesound.org) | A very large library of recorded sounds | Filter by Creative Commons 0. Avoid "Noncommercial" licenses if you might publish |
| Sonniss GDC Game Audio Bundles (https://sonniss.com/gameaudiogdc) | Large free bundles of professional sounds | A royalty-free license that allows use in games, without credit |
| Make your own | A short beep or chime made in free audio software, such as Audacity (https://www.audacityteam.org) | Your own work, so no license is needed |

Keep each file small: a short sound saved as WAV or M4A is a few kilobytes.
