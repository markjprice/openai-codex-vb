// Tests for saving and loading (src/storage), following STORAGE.md.
// AsyncStorage is replaced with an in-memory fake (see tests/setup.js).
// Run them with: npm test

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DATA_VERSION,
  DEFAULT_SETTINGS,
  EMPTY_NOUGHTS,
  EMPTY_SLIDING,
  EMPTY_WORDWHEEL,
  recordNoughtsGame,
  recordSlidingSolve,
  recordWord,
  clearNoughtsStats,
} from '@/storage/data';
import { KEYS, loadAll, resetEverything, saveNoughts, saveSettings, saveSliding } from '@/storage/storage';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('loading', () => {
  test('no saved data: empty statistics and default settings', async () => {
    const data = await loadAll();
    expect(data.settings).toEqual(DEFAULT_SETTINGS);
    expect(data.noughts).toEqual(EMPTY_NOUGHTS);
    expect(data.sliding).toEqual(EMPTY_SLIDING);
    expect(data.wordwheel).toEqual(EMPTY_WORDWHEEL);
    expect(await AsyncStorage.getItem(KEYS.version)).toBe(String(DATA_VERSION));
  });

  test('saved data, including a game in progress, survives a restart', async () => {
    const settings = { ...DEFAULT_SETTINGS, sound: true, reminderTime: '18:30' };
    const sliding = { ...EMPTY_SLIDING, game: { board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15], moves: 10, seconds: 42 } };
    await saveSettings(settings);
    await saveSliding(sliding);

    const data = await loadAll();
    expect(data.settings).toEqual(settings);
    expect(data.sliding.game).toEqual({ board: sliding.game.board, moves: 10, seconds: 42 });
  });

  test('damaged data resets only the damaged entry', async () => {
    await saveSettings({ ...DEFAULT_SETTINGS, vibration: false });
    await saveNoughts({ ...EMPTY_NOUGHTS, played: 7 });
    await AsyncStorage.setItem(KEYS.sliding, 'broken');

    const data = await loadAll();
    expect(data.sliding).toEqual(EMPTY_SLIDING);
    expect(data.settings.vibration).toBe(false);
    expect(data.noughts.played).toBe(7);
  });

  test('a value with the wrong type uses the default for that value only', async () => {
    await AsyncStorage.setItem(KEYS.settings, JSON.stringify({ sound: 'yes', vibration: false, reminderTime: '25:99' }));
    const data = await loadAll();
    expect(data.settings).toEqual({ ...DEFAULT_SETTINGS, vibration: false });
  });

  test('a damaged game in progress is dropped, but the statistics are kept', async () => {
    await AsyncStorage.setItem(
      KEYS.sliding,
      JSON.stringify({ game: { board: [1, 1, 1], moves: 3, seconds: 9 }, solved: 4, bestTime: 90, fewestMoves: 120 })
    );
    const data = await loadAll();
    expect(data.sliding).toEqual({ game: null, solved: 4, bestTime: 90, fewestMoves: 120 });
  });

  test('old data without a version number is kept, and saved as version 1', async () => {
    await AsyncStorage.setItem(KEYS.noughts, JSON.stringify({ ...EMPTY_NOUGHTS, played: 3, bestStreak: 2 }));
    const data = await loadAll();
    expect(data.noughts.played).toBe(3);
    expect(data.noughts.bestStreak).toBe(2);
    expect(await AsyncStorage.getItem(KEYS.version)).toBe('1');
  });
});

describe('resetting', () => {
  test('Reset everything clears statistics, games in progress, and settings', async () => {
    await saveSettings({ ...DEFAULT_SETTINGS, sound: true });
    await saveNoughts({ ...EMPTY_NOUGHTS, played: 5 });
    const data = await resetEverything();
    expect(data.settings).toEqual(DEFAULT_SETTINGS);
    expect(data.noughts).toEqual(EMPTY_NOUGHTS);
    expect((await loadAll()).settings).toEqual(DEFAULT_SETTINGS);
    expect(await AsyncStorage.getItem(KEYS.version)).toBe('1');
  });

  test('Reset statistics keeps a game in progress', () => {
    const data = { ...EMPTY_NOUGHTS, played: 5, currentStreak: 2, game: { mode: 'computer' as const, moves: [4] } };
    expect(clearNoughtsStats(data)).toEqual({ ...EMPTY_NOUGHTS, game: data.game });
  });
});

describe('statistics follow the definitions in STORAGE.md', () => {
  test('noughts and crosses: wins against the computer build a streak; a draw ends it', () => {
    let data = EMPTY_NOUGHTS;
    data = recordNoughtsGame(data, 'computer', 'win');
    data = recordNoughtsGame(data, 'computer', 'win');
    expect(data).toMatchObject({ played: 2, computerWins: 2, currentStreak: 2, bestStreak: 2 });
    data = recordNoughtsGame(data, 'computer', 'draw');
    expect(data).toMatchObject({ played: 3, currentStreak: 0, bestStreak: 2 });
  });

  test('noughts and crosses: two-player games count as played, but do not change the streak', () => {
    let data = recordNoughtsGame(EMPTY_NOUGHTS, 'computer', 'win');
    data = recordNoughtsGame(data, 'two-player', 'loss');
    expect(data).toMatchObject({ played: 2, computerWins: 1, currentStreak: 1 });
  });

  test('sliding numbers: best time and fewest moves can come from different games', () => {
    let data = recordSlidingSolve(EMPTY_SLIDING, 120, 200);
    data = recordSlidingSolve(data, 90, 260);
    expect(data).toEqual({ game: null, solved: 2, bestTime: 200, fewestMoves: 90 });
  });

  test('word wheel: days in a row counts calendar days, once per day', () => {
    let data = recordWord(EMPTY_WORDWHEEL, '2026-11-01', 'plant', 5);
    data = recordWord(data, '2026-11-01', 'planet', 11);
    expect(data.daysInARow).toBe(1);
    data = recordWord(data, '2026-11-02', 'pastel', 6);
    expect(data.daysInARow).toBe(2);
    expect(data.today).toEqual({ date: '2026-11-02', found: ['pastel'], finished: false });
    expect(data.bestScore).toBe(11);
  });

  test('word wheel: missing a whole day sets the streak back to 1', () => {
    let data = recordWord(EMPTY_WORDWHEEL, '2026-11-01', 'plant', 5);
    data = recordWord(data, '2026-11-03', 'plate', 5);
    expect(data.daysInARow).toBe(1);
  });
});
