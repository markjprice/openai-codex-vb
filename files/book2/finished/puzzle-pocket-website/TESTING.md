# Testing the Puzzle Pocket website

Each requirement from PRODUCT-BRIEF.md, and the checks that prove it.
Automated checks run with `npm test` (unit tests) and `npm run test:e2e`
(browser tests in Chromium, Firefox, and WebKit). Tick the manual column when
you've done the check yourself, in at least two browsers.

## Website acceptance criteria

| # | Requirement | Manual check | Automated check | Done |
| --- | --- | --- | --- | --- |
| 1 | The Home page describes all three puzzles | Read the Home page against content/site-text.md | `site.spec.js`: the Home page describes all three puzzles | [ ] |
| 2 | Every page reachable in one click | Click through the navigation and footer on every page | `site.spec.js`: every page can be reached in one click (one test per page) | [ ] |
| 3 | Current page marked without relying on color alone | Look at the navigation on each page; check it in grayscale | `site.spec.js`: the current page is marked with aria-current… | [ ] |
| 4 | No sideways scrolling at 320 pixels | Narrow the browser window, or use the device toolbar | `site.spec.js`: no page scrolls sideways at 320 pixels wide | [ ] |
| 5 | Usable with a keyboard alone, with a visible focus outline | Tab through every page; use the skip link | `site.spec.js`: the skip link…; `demo.spec.js`: a whole game…with the keyboard; `contact.spec.js`: …with the keyboard alone | [ ] |
| 6 | Body text at least 16 pixels; text contrast at least 4.5:1 | Zoom to 200% and read each page | `tokens.test.js`: contrast and text size tests; `site.spec.js`: body text…; `accessibility.spec.js`: axe scan | [ ] |
| 7 | Alt text describes each mockup | Listen with VoiceOver or Narrator | `site.spec.js`: every image has alt text… | [ ] |
| 8 | Mockups labeled as early designs | Read each mockup caption | `site.spec.js`: …every mockup is labeled as an early design | [ ] |
| 9 | Never claims the game is in a store | Read every page | `site.spec.js`: the site never claims the game is in a store yet | [ ] |
| 10 | No requests to other companies' servers | Developer tools > Network, reload each page | `site.spec.js`: no page requests anything from another server | [ ] |
| 11 | Support and Privacy open from their own addresses | Type each address into the browser | `site.spec.js`: the Support and Privacy pages open directly… | [ ] |

## Demo acceptance criteria

| # | Requirement | Manual check | Automated check | Done |
| --- | --- | --- | --- | --- |
| 1 | Click, tap, Enter, or Space places a mark | Play with a mouse, a keyboard, and on a phone | `demo.spec.js`: demo criterion 1…; …with the keyboard alone | [ ] |
| 2 | A taken square does nothing | Click a taken square | `rules.test.js`: position 9; `demo.spec.js`: demo criterion 2 | [ ] |
| 3 | Three in a row wins, with highlighted squares | Play an X win and an O win | `rules.test.js`: positions 1–6; `demo.spec.js`: demo criterion 3 (two tests) | [ ] |
| 4 | A full board with no winner is a draw | Play a draw | `rules.test.js`: position 7; `demo.spec.js`: demo criterion 4 | [ ] |
| – | A ninth move that wins is a win, not a draw | Play the position in test-positions.md | `rules.test.js`: position 8; `demo.spec.js`: …ninth move… | [ ] |
| 5 | No moves after a win or a draw | Click an empty square after a win | `rules.test.js`: position 10; `demo.spec.js`: demo criterion 5 | [ ] |
| 6 | Restart clears the board and makes it X's turn | Press Restart, then press Enter | `demo.spec.js`: demo criterion 6 | [ ] |
| 7 | A screen reader announces each move and the result | Play a game with VoiceOver or Narrator | `demo.spec.js`: demo criterion 7 (checks the live region) | [ ] |

## Contact form

| Requirement | Manual check | Automated check | Done |
| --- | --- | --- | --- |
| Empty form shows an error summary, with focus moved to it | Press Send with every field empty | `contact.spec.js`: pressing Send with every field empty… | [ ] |
| Invalid email rejected, typed text kept | Type a bad address and press Send | `validate.test.js`; `contact.spec.js`: an email address in the wrong format… | [ ] |
| Message over 2,000 characters rejected | Paste a long message and press Send | `validate.test.js`; `contact.spec.js`: a message over 2,000 characters… | [ ] |
| Summary links move focus to each field | Click each link in the summary | `contact.spec.js`: each link in the error summary… | [ ] |
| Asks only for name, email, topic, and message | Read the form | `contact.spec.js`: the form asks for nothing beyond… | [ ] |
| Netlify attributes and hidden honeypot present | View the page source | `contact.spec.js`: the form has the attributes Netlify Forms needs… | [ ] |
| Sent and couldn't-send messages | Send a real message on the published site (Chapter 2.10) | `contact.spec.js`: when a message is sent…; when a message can't be sent… | [ ] |

## Checks a person must make

| Requirement | Manual check | Automated check | Done |
| --- | --- | --- | --- |
| Privacy policy matches the product | Read it against PRODUCT-BRIEF.md, sentence by sentence | None: a person must judge this | [ ] |
| Alt text is accurate and useful | Listen with a screen reader | None: tests only check that alt text exists | [ ] |
| Design looks right on a phone | Preview on your phone with `npm run dev -- --host` | None | [ ] |
| Works in two browser families | Chrome or Edge, and Firefox or Safari | Playwright runs Chromium, Firefox, and WebKit | [ ] |

## Release checks

| Check | How | Done |
| --- | --- | --- |
| No placeholder text | `site.spec.js`: no page contains placeholder text; search the project for [PLACEHOLDER] and [TODO] | [ ] |
| Unique titles and descriptions | `site.spec.js`: every page has a unique title and a description | [ ] |
| Lighthouse (Mobile) on Home and How to Play | `npm run build`, `npm run preview`, then Lighthouse in Chrome | [ ] |
| Known security problems in packages | `npm audit` | [ ] |
| No secrets in the project | Ask Codex to search for passwords, API keys, and private email addresses | [ ] |
| No console errors | Developer tools > Console on every page | [ ] |
