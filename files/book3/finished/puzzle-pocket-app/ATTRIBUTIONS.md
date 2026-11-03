# Attributions

Every font, word list, sound, and image in the Puzzle Pocket game, where it
came from, and its license. The website's ATTRIBUTIONS.md lists the same
fonts.

| Asset | Files | Source | License | Credit required |
| --- | --- | --- | --- | --- |
| Atkinson Hyperlegible font (Regular and Bold) | `assets/fonts/AtkinsonHyperlegible-Regular.ttf`, `assets/fonts/AtkinsonHyperlegible-Bold.ttf` | Braille Institute of America, via `@expo-google-fonts/atkinson-hyperlegible` 0.4.1. (The website uses WOFF2 versions of the same font; apps need TTF.) | SIL Open Font License 1.1 (`assets/fonts/OFL.txt`) | Keep `OFL.txt` with the font files. Don't sell the font on its own. |
| Word list | `assets/words/words.json` (made by `scripts/prepare-words.mjs`) | SCOWL (Spell Checker Oriented Word Lists) by Kevin Atkinson, sizes 10 to 35, English and American spellings, via `wordlist-english` 1.2.1. http://wordlist.aspell.net | SCOWL license: use, copying, changes, distribution, and sale allowed, provided the copyright notice appears in supporting documentation. Full text in `node_modules/wordlist-english/Copyright` | "Word list from SCOWL, Copyright 2000-2016 by Kevin Atkinson" in the app's credits or the website, with the permission notice |
| Daily puzzles | `assets/words/daily-puzzles.json` (made by `scripts/make-daily-puzzles.mjs`) | Made from the word list above | As for the word list | As for the word list |
| Blocklist (used to filter the word list; not bundled in the app) | `naughty-words` 1.2.0, English list | "List of Dirty, Naughty, Obscene, and Otherwise Bad Words", https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words | Creative Commons Attribution 4.0 | Credit if the list itself is redistributed |

## Assets made for this game

| Asset | Files | Notes |
| --- | --- | --- |
| Sound effects | `assets/sounds/move.wav`, `word.wav`, `win.wav` | Generated from simple tones. No license needed. |
| App icon, adaptive icon, splash image, favicon | `assets/images/*.png` | The website's favicon design: a 3x3 grid in the game's colors. |
