# Bill Splitter checkpoints

Chapters 1.6 to 1.9 build the Bill Splitter one task at a time. If your
version gets stuck, or Codex builds something different from the book, copy
the checkpoint for the chapter you're starting into your practice folder and
carry on from there.

| Folder | Use it to start | What works |
| --- | --- | --- |
| `01-setup-ch06` | Chapter 1.7 | `npm start` prints "Bill Splitter". `npm test` reports one passing test. |
| `02-task1-ch07` | Chapter 1.8 and Chapter 1.9 | Task 1: asks the three questions and shows equal shares. A bill of 100 split between 3 people shows 33.33 each, so one cent goes missing. Chapter 1.9 fixes this. |
| `03-task2-ch09` | Chapter 1.9's "What to ask next" | Task 2: uneven shares add up to the exact total (33.34, 33.33, 33.33). |
| `04-complete` | Comparing with your finished version | Task 3: invalid input is rejected with a helpful message, and the question is asked again. |

Each checkpoint contains `AGENTS.md`, `PRODUCT-BRIEF.md`, and the matching
`TASKS.md` (from `02-task1-ch07` onward).

## Using a checkpoint

1. Copy the contents of the checkpoint folder into your practice folder,
   replacing the files with the same names.
2. Open the practice project in Codex and ask:

   ```
   Run npm test and npm start, and tell me which tasks in TASKS.md are complete.
   ```

3. Commit the checkpoint so the review pane starts from a clean state:

   ```
   Commit the current changes with the message "Start from checkpoint".
   ```

The checkpoints don't include Git history. Your practice folder keeps its own.
