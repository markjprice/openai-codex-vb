# Word list checklist

Check each word list you're considering against these four questions before
you give it to Codex. Read the license yourself, from the list's own website
or license file, not from a summary.

List name: ____________________

Official source (where you downloaded it): ____________________

## 1. License

- [ ] I've read the license text in the downloaded files.
- [ ] It allows the list to be included in an app I might publish.
- [ ] It allows the list to be changed (filtered and shortened).
- [ ] I know whether it requires a credit, and what the credit must say.
- [ ] I've recorded the list, its source, its license, and any required
      credit in ATTRIBUTIONS.md.

License name: ____________________

Credit required: ____________________

## 2. Spelling

- [ ] It uses one spelling, such as American or British English, not both.
- [ ] That spelling matches what my players expect, and what my website uses.

Spelling: ____________________

## 3. Size

- [ ] It includes everyday words.
- [ ] It doesn't include thousands of obscure words that would frustrate
      players. (Lists often come in sizes; choose a small or medium one.)
- [ ] After keeping only words of 4 to 12 letters, it has enough words to make
      good puzzles (aim for tens of thousands, not millions).

Number of words after filtering: ____________________

## 4. Content

- [ ] I've checked whether it contains offensive words. (Most general lists do.)
- [ ] I have a blocklist of words to remove, and I've reviewed it myself.
- [ ] The preparation script removes every word on the blocklist.
- [ ] I've played five of the prepared daily puzzles, and none of them shows a
      word I wouldn't want players to see.

Blocklist source: ____________________

## The list used in the finished sample app

For comparison, the finished Puzzle Pocket app in the book's repository uses:

- **Word list**: SCOWL (Spell Checker Oriented Word Lists) by Kevin Atkinson,
  sizes 10 to 35 (the "small" size), English and American spellings, from the
  `wordlist-english` npm package. License: a permissive SCOWL license that
  allows use, changes, distribution, and sale, with a copyright notice. See
  http://wordlist.aspell.net.
- **Blocklist**: the "List of Dirty, Naughty, Obscene, and Otherwise Bad Words"
  (English), from the `naughty-words` npm package, under Creative Commons
  Attribution 4.0, plus the app's own `scripts/blocklist-extra.txt`.
