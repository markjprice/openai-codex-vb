// Chooses the daily word wheel by date, so every player gets the same puzzle
// on the same calendar day, using the date on their phone.

// The first day in the puzzle file. Day 0 is this date.
export const START_DATE = '2026-11-01';

// The local calendar date as text, such as "2026-11-03".
export function dateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Whole days between two "YYYY-MM-DD" dates. Uses UTC so that daylight
// saving changes never make a day 23 or 25 hours long.
export function daysBetween(fromKey, toKey) {
  const toUtc = (key) => {
    const [year, month, day] = key.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((toUtc(toKey) - toUtc(fromKey)) / 86400000);
}

// The puzzle for a date. After the last puzzle, the list starts again.
export function puzzleForDate(puzzles, date = new Date()) {
  const days = daysBetween(START_DATE, dateKey(date));
  const index = ((days % puzzles.length) + puzzles.length) % puzzles.length;
  return { ...puzzles[index], number: days + 1, date: dateKey(date) };
}
