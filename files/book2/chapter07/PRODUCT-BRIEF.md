# Product brief: Puzzle Pocket website

## User and problem

A person who has heard about Puzzle Pocket wants to find out what the game
is, how to play it, and how to get help, but the game isn't in the app
stores yet and has nowhere else to explain itself.

## Desired outcome

A new visitor understands the game and has played the noughts and crosses
demo within two minutes. An existing player finds an answer or a way to ask
for help in under a minute. An app store reviewer finds a working support
page and an accurate privacy policy.

## Product type

A static website: pages of HTML, CSS, and JavaScript, built with Vite and
published to a hosting service. There is no backend.

## About the game

Puzzle Pocket is a mobile game with three classic puzzles:

- Noughts and crosses: two players take turns placing X and O on a 3x3 grid.
  The first to get three in a row wins.
- Sliding number puzzle: slide numbered tiles around a grid until they're in
  order.
- Word wheel: make as many words as possible from seven letters arranged in
  a wheel.

The game saves progress, best times, and win streaks on the player's phone.
It can send a daily reminder to play. It has no accounts, no advertising, no
in-app purchases, and no online multiplayer. It isn't released yet.

## Visitors

| Visitor | Arrives from | Wants to know | Needs from the site |
| --- | --- | --- | --- |
| New player | A search, a link from a friend, or a store listing | What is this game, and will I like it? | A clear description, pictures, and a way to try it |
| Existing player | The game's settings screen or a store listing | How do I do something, or fix a problem? | Instructions, answers to common questions, and a way to ask for help |
| App store reviewer | The game's store listing | Does this app have a working support page and a privacy policy? | Pages that load, describe the actual app, and match the store listing |

## Pages

1. Home (index.html): introduces the game, its three puzzles, and when and
   where visitors can get it.
2. How to Play (how-to-play.html): the rules of each puzzle, and a playable
   noughts and crosses demo.
3. Support (support.html): answers to common questions.
4. Privacy (privacy.html): what the game and the website do with
   information, in plain language.
5. Contact (contact.html): a form to ask a question or report a problem.

Every page links to every other page through a shared navigation bar.

## Not in the first release

- Accounts and logins
- Analytics, tracking, or cookies
- Advertising
- A newsletter or mailing list
- Fonts, scripts, or images loaded from other companies' servers
- A blog, news page, or press kit
- App store badges or download links (until the game is in a store)

## Visual direction

Friendly, calm, and clever:

- Friendly: rounded corners, warm colors, and plain everyday language.
- Calm: plenty of white space, one main action per screen, and no flashing or
  moving elements.
- Clever: neat grid layouts that echo the puzzles themselves.

## Information

Receives: messages sent through the contact form (an optional name, an email
address, an optional topic, and a message).

Stores: nothing on the website itself. Contact messages are stored by the
hosting provider's form service and forwarded to the support email address.

Shares: nothing with any other company. Every file the site needs is stored
with the site.

## Acceptance criteria

1. The Home page describes all three puzzles.
2. Every page can be reached from every other page in one click.
3. The current page is marked in the navigation in a way that doesn't rely on
   color alone.
4. Every page is readable without sideways scrolling on a screen 320 pixels
   wide.
5. Every page can be used with a keyboard alone, with a visible focus
   outline.
6. Body text is at least 16 pixels tall, and every text color has a contrast
   ratio of at least 4.5:1 against its background.
7. Every image has alt text, or empty alt text if it's decorative.
8. Every mockup is labeled "Early design. The finished game may look
   different."
9. The site never claims the game is available in a store before it is.
10. No page requests a file from another company's server.
11. The Support and Privacy pages can be opened directly from their own
    addresses.

## Demo: noughts and crosses
Two players share one device and take turns. X always goes first.

Not in the demo:
- A computer opponent (this comes in the game, in Book 3)
- Scores or statistics across games
- Sounds or animations that can't be turned off

Acceptance criteria:
1. Clicking, tapping, or pressing Enter or Space on an empty square
   places the current player's mark.
2. Choosing a square that's already taken does nothing, and the turn
   doesn't change.
3. Three marks in a row, column, or diagonal win. The status message
   says "X wins!" or "O wins!", and the winning squares are highlighted.
4. A full board with no winner is a draw. The status message says
   "It's a draw."
5. No moves are possible after a win or a draw.
6. The Restart button clears the board and makes it X's turn.
7. A screen reader announces each move and the result.
