# Puzzle Pocket

A small collection of classic puzzles for iPhone and Android: noughts and
crosses (against a friend or the computer), a sliding number puzzle, and a
daily word wheel. Progress, best times, and streaks are saved on the phone.
There are no accounts, ads, or analytics.

This is the finished version from the end of Book 3. Compare it with yours, or
use it to take screenshots. It's built with Expo SDK 57 and Expo Router.

## What you need

- Node.js (the LTS version)
- Expo Go on your phone, for the SDK version in `package.json` (see https://expo.dev/go)
- A free Expo account, signed in on both your computer and Expo Go

## Start

```
npm install
npx expo start
```

Scan the QR code with your iPhone's Camera app, or from Expo Go on Android.
Press `w` in the terminal to open the web version as a quick preview.

If your phone can't connect, use tunnel mode: `npx expo start --tunnel`.

## Commands

| Command | What it does |
| --- | --- |
| `npx expo start` | Starts the development server |
| `npm test` | Runs every test: the rules, the opponent, the sliding puzzle, the word wheel, storage, colors, and the word data |
| `npm run typecheck` | Checks the TypeScript code for mistakes |
| `npm run words` | Rebuilds `assets/words/words.json` from SCOWL and the blocklists |
| `npm run puzzles` | Rebuilds `assets/words/daily-puzzles.json` from the word list |
| `npx expo install --check` | Checks that every Expo package matches the project's SDK version |

## Testing options

While you're developing (in Expo Go), three extra options appear. They're
hidden in preview and production builds, because they're behind `__DEV__`:

- **Component gallery (testing)** on the hub: every shared component in every state.
- **Start one move from solved (testing)** on the sliding puzzle.
- **Send a test reminder in 1 minute** in Settings, once the reminder is on.

## Building and sharing

`eas.json` has two build profiles:

- `preview`: for testers. Android builds an APK you can share as a link.
- `production`: for the App Store and Google Play.

Before your first build, change these in `app.json`:

- `ios.bundleIdentifier` and `android.package`: replace `com.example.puzzlepocket`
  with an identifier you control. Once published, it can never change.
- `version`, `ios.buildNumber`, and `android.versionCode` for each new build.

## Permissions

The only permission the app asks for is notifications, and only after the
player turns on the daily reminder and taps Continue. `app.json` blocks the
microphone and other permissions that some packages add by default, and
configures `expo-audio` without microphone or background playback.

## How the project is organized

| File or folder | What it's for |
| --- | --- |
| `src/app/` | The screens. Each file is a screen (Expo Router): the hub (`index.tsx`), the three puzzles, Stats, Settings, and the component gallery |
| `src/components/` | Shared components: Grid, Tile, Button, ResultsDialog, and others. See `src/components/README.md` |
| `src/theme/theme.ts` | Colors, sizes, and fonts, read from `shared/design-tokens.json` |
| `src/storage/` | Saving and loading, following STORAGE.md. The only code that uses AsyncStorage |
| `src/feedback/feedback.ts` | Vibration and sound, checked against the player's settings |
| `src/reminder/` | The daily reminder, and its text |
| `src/words/words.ts` | The bundled word list and today's puzzle |
| `shared/` | Code shared with the website: design tokens, noughts and crosses rules, and the other puzzle rules. Nothing here depends on React, Expo, or a browser |
| `assets/` | Fonts, sounds, images, and word data |
| `scripts/` | The scripts that prepare the word list and daily puzzles |
| `tests/` | Jest tests |
| `PRODUCT-BRIEF.md` | What the game should do |
| `STORAGE.md` | What the game saves, and what each statistic means |
| `STORE-LISTING.md` | The App Store and Google Play listing text and privacy answers |
| `ATTRIBUTIONS.md` | Where every font, word list, sound, and image came from |
| `AGENTS.md` | Working agreements that Codex reads before every task |
