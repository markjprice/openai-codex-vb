# Book 3 sample files – Building and Publishing Mobile Games

Copy the files you need into your `puzzle-pocket-app` folder inside
`Documents/Codex Projects`. Don't work inside your downloaded copy of this
repository.

| Chapter | Folder | What's inside |
| --- | --- | --- |
| 3.1 | `chapter01` | `PRODUCT-BRIEF.md`, a complete brief for the Puzzle Pocket game, and `AGENTS.md`, working agreements for a mobile app project |
| 3.2 | `chapter02` | `create-project-instruction.txt`, the four-part instruction, ready to paste (fill in the SDK version) |
| 3.3 | `chapter03` | `components-README.md`, the properties and states of each shared component. Save it as `src/components/README.md` |
| 3.4 | `chapter04` | `opponent-positions.md`, board positions for testing the computer opponent and undo |
| 3.5 | `chapter05` | `sliding-positions.md`, boards that can and can't be solved, including the 14-15 swap |
| 3.6 | `chapter06` | `word-list-checklist.md`, the four questions as a checklist, and `test-words.txt`, a small word list for automated tests |
| 3.7 | `chapter07` | `STORAGE.md`, a complete storage plan, with a definition of each statistic |
| 3.8 | `chapter08` | `reminder-text.md`, text for the reminder, its explanation, and the refusal message, plus sources of sound effects |
| 3.9 | `chapter09` | `device-test-matrix.md` and `beta-tester-guide.md` |
| 3.10 | `chapter10` | `STORE-LISTING.md`, the listing fields and privacy answers for both stores, and `release-checklist.md` |
| All | `finished/puzzle-pocket-app` | The complete game from the end of Book 3, built with Expo SDK 57, with 111 tests |

## Notes

- The `finished` project needs `npm install` before it runs. See its README.
- The test word list in `chapter06/test-words.txt` is built around one test
  puzzle: the letters P L A N E T S, with A in the center. Its tests are in
  `finished/puzzle-pocket-app/tests/wordwheel.test.js`.
- The website's fonts are WOFF2 files, which phones can't load. The finished
  app uses TTF versions of the same font (see its ATTRIBUTIONS.md).
- `com.example.puzzlepocket` in the finished app's `app.json` is a
  placeholder. Use an identifier you control before you build.
