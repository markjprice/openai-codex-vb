// Saves and loads the game's data on the phone with AsyncStorage.
// This is the only file that uses AsyncStorage. Screens call these functions.
// See STORAGE.md for what's stored and why.

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DATA_VERSION,
  DEFAULT_SETTINGS,
  checkNoughts,
  checkSettings,
  checkSliding,
  checkWordWheel,
  type NoughtsData,
  type Settings,
  type SlidingData,
  type WordWheelData,
} from './data';

export const KEYS = {
  version: 'puzzle-pocket:version',
  settings: 'puzzle-pocket:settings',
  noughts: 'puzzle-pocket:noughts',
  sliding: 'puzzle-pocket:sliding',
  wordwheel: 'puzzle-pocket:wordwheel',
} as const;

export type AllData = {
  settings: Settings;
  noughts: NoughtsData;
  sliding: SlidingData;
  wordwheel: WordWheelData;
};

// Reads one entry. Missing or damaged entries give undefined, so the check
// functions replace only that entry with its defaults.
async function read(key: string): Promise<unknown> {
  try {
    const text = await AsyncStorage.getItem(key);
    return text === null ? undefined : JSON.parse(text);
  } catch {
    return undefined;
  }
}

async function write(key: string, value: unknown) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Saving failed, such as when the phone is full. The game keeps working,
    // and the next save tries again.
  }
}

// Loads everything when the app starts.
export async function loadAll(): Promise<AllData> {
  const [version, settings, noughts, sliding, wordwheel] = await Promise.all([
    read(KEYS.version),
    read(KEYS.settings),
    read(KEYS.noughts),
    read(KEYS.sliding),
    read(KEYS.wordwheel),
  ]);

  const data: AllData = {
    settings: checkSettings(settings),
    noughts: checkNoughts(noughts),
    sliding: checkSliding(sliding),
    wordwheel: checkWordWheel(wordwheel),
  };

  // Version 1 is the first format. Data saved before the version number
  // existed is treated as version 1. A later update would convert older
  // versions here, before saving the new version number.
  if (version !== DATA_VERSION) {
    await write(KEYS.version, DATA_VERSION);
  }

  return data;
}

export const saveSettings = (settings: Settings) => write(KEYS.settings, settings);
export const saveNoughts = (data: NoughtsData) => write(KEYS.noughts, data);
export const saveSliding = (data: SlidingData) => write(KEYS.sliding, data);
export const saveWordWheel = (data: WordWheelData) => write(KEYS.wordwheel, data);

// Clears statistics, games in progress, and settings, then saves the version again.
export async function resetEverything(): Promise<AllData> {
  try {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  } catch {
    // If removing fails, the defaults below are saved over the old values.
  }
  await write(KEYS.version, DATA_VERSION);
  return {
    settings: DEFAULT_SETTINGS,
    noughts: checkNoughts(undefined),
    sliding: checkSliding(undefined),
    wordwheel: checkWordWheel(undefined),
  };
}
