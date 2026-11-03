# Accessibility checklist

Target: WCAG 2.2 level AA. Copy the table for each page, and tick each check
when you've done it yourself. Write anything that fails as a bug report.

Page: ____________________

## Screen sizes

- [ ] No sideways scrolling at 320 pixels wide
- [ ] Text blocks are no wider than about 70 characters per line on a wide screen
- [ ] Images and mockups shrink to fit, without stretching or being cut off
- [ ] Nothing disappears on a phone: content is rearranged, not removed

## Keyboard

- [ ] Pressing Tab from the address bar reaches the Skip to main content link first
- [ ] The skip link becomes visible when it has focus, and jumps to the main content
- [ ] The focus outline is always visible
- [ ] Focus moves in the same order as the page reads
- [ ] Enter activates every link, and Enter or Space activates every button
- [ ] There's no keyboard trap: you can always Tab onward and Shift+Tab back

## Screen readers

- [ ] The page declares its language (`<html lang="en">`)
- [ ] The page has exactly one main heading (h1), and headings don't skip a level
- [ ] Every meaningful image has alt text that says what it shows and why it's there
- [ ] Every decorative image has empty alt text (`alt=""`)
- [ ] Every icon used as a button or link has a text label
- [ ] The current page's navigation link has `aria-current="page"`
- [ ] Link text says where the link goes (no "click here")
- [ ] Listened to the page with VoiceOver (Cmd+F5) or Narrator (Ctrl+Windows key+Enter)

## Measurable checks

| Check | WCAG 2.2 AA rule | Result |
| --- | --- | --- |
| Text contrast | At least 4.5:1 for normal text, 3:1 for large text | |
| Non-text contrast | At least 3:1 for focus outlines, form field borders, and icons that carry meaning | |
| Text size | Works with text enlarged to 200% (Ctrl and +, or Cmd and +) | |
| Touch targets | At least 24 by 24 pixels; this site aims for 44 by 44 | |

## Motion

- [ ] With reduced motion turned on in the operating system, nothing on the page animates

## Demo (How to Play page only)

- [ ] Every square can be reached with Tab and chosen with Enter or Space
- [ ] Each square is announced with its position and contents, such as "Row 1, column 2, empty"
- [ ] The status message is announced after every move and at the end of a game
- [ ] The winning squares are marked with more than color alone

## Contact form (Contact page only)

- [ ] Every field has a visible label above it
- [ ] Pressing Send with errors moves focus to the error summary
- [ ] Each error in the summary links to its field
- [ ] Each field with an error has a message next to it that says how to fix it
