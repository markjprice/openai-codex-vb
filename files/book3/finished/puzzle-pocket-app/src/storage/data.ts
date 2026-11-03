// The shape of everything the game saves, its default values, and the rules
// that update the statistics. The definitions follow STORAGE.md exactly.
// Nothing in this file reads or writes the phone's storage; see storage.ts.

export const DATA_VERSION = 1;

export type Settings = {
  sound: boolean;
  vibration: boolean;
  reminder: boolean;
  reminderTime: string; // "HH:MM", in the phone's local time
};

export type NoughtsMode = 'two-player' | 'computer';

export type NoughtsData = {
  game: { mode: NoughtsMode; moves: number[] } | null;
  played: number;
  computerWins: number;
  currentStreak: number;
  bestStreak: number;
};

export type SlidingData = {
  game: { board: number[]; moves: number; seconds: number } | null;
  solved: number;
  bestTime: number | null; // seconds
  fewestMoves: number | null;
};

export type WordWheelData = {
  today: { date: string; found: string[]; finished: boolean } | null;
  lastPlayedDate: string | null; // the last date with at least one word found
  daysInARow: number;
  bestScore: number;
};

export const DEFAULT_SETTINGS: Settings = {
  sound: false,
  vibration: true,
  reminder: false,
  reminderTime: '09:00',
};

export const EMPTY_NOUGHTS: NoughtsData = {
  game: null,
  played: 0,
  computerWins: 0,
  currentStreak: 0,
  bestStreak: 0,
};

export const EMPTY_SLIDING: SlidingData = {
  game: null,
  solved: 0,
  bestTime: null,
  fewestMoves: null,
};

export const EMPTY_WORDWHEEL: WordWheelData = {
  today: null,
  lastPlayedDate: null,
  daysInARow: 0,
  bestScore: 0,
};

// ---------- Checking saved data ----------
// Each check takes whatever was read from storage and returns valid data.
// A missing or wrong-type value is replaced with its default; nothing else changes.

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const count = (value: unknown) => (Number.isInteger(value) && (value as number) >= 0 ? (value as number) : 0);
const countOrNull = (value: unknown) =>
  Number.isFinite(value) && (value as number) >= 0 ? (value as number) : null;
const bool = (value: unknown, fallback: boolean) => (typeof value === 'boolean' ? value : fallback);

export function checkSettings(value: unknown): Settings {
  if (!isObject(value)) return DEFAULT_SETTINGS;
  return {
    sound: bool(value.sound, DEFAULT_SETTINGS.sound),
    vibration: bool(value.vibration, DEFAULT_SETTINGS.vibration),
    reminder: bool(value.reminder, DEFAULT_SETTINGS.reminder),
    reminderTime:
      typeof value.reminderTime === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value.reminderTime)
        ? value.reminderTime
        : DEFAULT_SETTINGS.reminderTime,
  };
}

export function checkNoughts(value: unknown): NoughtsData {
  if (!isObject(value)) return EMPTY_NOUGHTS;
  const game = value.game;
  const validGame =
    isObject(game) &&
    (game.mode === 'two-player' || game.mode === 'computer') &&
    Array.isArray(game.moves) &&
    game.moves.every((move) => Number.isInteger(move) && move >= 0 && move < 9);
  return {
    game: validGame ? { mode: game.mode as NoughtsMode, moves: game.moves as number[] } : null,
    played: count(value.played),
    computerWins: count(value.computerWins),
    currentStreak: count(value.currentStreak),
    bestStreak: count(value.bestStreak),
  };
}

export function checkSliding(value: unknown): SlidingData {
  if (!isObject(value)) return EMPTY_SLIDING;
  const game = value.game;
  const validGame =
    isObject(game) &&
    Array.isArray(game.board) &&
    game.board.length === 16 &&
    [...(game.board as number[])].sort((a, b) => a - b).every((tile, index) => tile === index);
  return {
    game: validGame
      ? { board: game.board as number[], moves: count(game.moves), seconds: count(game.seconds) }
      : null,
    solved: count(value.solved),
    bestTime: countOrNull(value.bestTime),
    fewestMoves: countOrNull(value.fewestMoves),
  };
}

export function checkWordWheel(value: unknown): WordWheelData {
  if (!isObject(value)) return EMPTY_WORDWHEEL;
  const today = value.today;
  const validToday =
    isObject(today) &&
    typeof today.date === 'string' &&
    Array.isArray(today.found) &&
    today.found.every((word) => typeof word === 'string');
  return {
    today: validToday
      ? { date: today.date as string, found: today.found as string[], finished: bool(today.finished, false) }
      : null,
    lastPlayedDate: typeof value.lastPlayedDate === 'string' ? value.lastPlayedDate : null,
    daysInARow: count(value.daysInARow),
    bestScore: count(value.bestScore),
  };
}

// ---------- Updating statistics ----------

export type NoughtsOutcome = 'win' | 'loss' | 'draw';

// A finished noughts and crosses game. "win" means the player won: in a
// two-player game, there's no player to win for, so only computer games
// change the streak.
export function recordNoughtsGame(data: NoughtsData, mode: NoughtsMode, outcome: NoughtsOutcome): NoughtsData {
  const next = { ...data, game: null, played: data.played + 1 };
  if (mode !== 'computer') return next;
  if (outcome === 'win') {
    const currentStreak = data.currentStreak + 1;
    return {
      ...next,
      computerWins: data.computerWins + 1,
      currentStreak,
      bestStreak: Math.max(data.bestStreak, currentStreak),
    };
  }
  return { ...next, currentStreak: 0 };
}

// A solved sliding puzzle. Best time and fewest moves are kept separately.
export function recordSlidingSolve(data: SlidingData, moves: number, seconds: number): SlidingData {
  return {
    game: null,
    solved: data.solved + 1,
    bestTime: data.bestTime === null ? seconds : Math.min(data.bestTime, seconds),
    fewestMoves: data.fewestMoves === null ? moves : Math.min(data.fewestMoves, moves),
  };
}

// The number of whole calendar days from one "YYYY-MM-DD" date to another.
function daysApart(from: string, to: string) {
  const toUtc = (key: string) => {
    const [year, month, day] = key.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  };
  return Math.round((toUtc(to) - toUtc(from)) / 86400000);
}

// A word accepted in today's word wheel.
export function recordWord(data: WordWheelData, date: string, word: string, todayScore: number): WordWheelData {
  const today =
    data.today && data.today.date === date ? data.today : { date, found: [], finished: false };

  let daysInARow = data.daysInARow;
  if (data.lastPlayedDate !== date) {
    daysInARow = data.lastPlayedDate && daysApart(data.lastPlayedDate, date) === 1 ? data.daysInARow + 1 : 1;
  }

  return {
    today: { ...today, found: [...today.found, word] },
    lastPlayedDate: date,
    daysInARow,
    bestScore: Math.max(data.bestScore, todayScore),
  };
}

// Statistics as a new player would see them, keeping games in progress.
export function clearNoughtsStats(data: NoughtsData): NoughtsData {
  return { ...EMPTY_NOUGHTS, game: data.game };
}
export function clearSlidingStats(data: SlidingData): SlidingData {
  return { ...EMPTY_SLIDING, game: data.game };
}
export function clearWordWheelStats(data: WordWheelData): WordWheelData {
  return { ...EMPTY_WORDWHEEL, today: data.today };
}
