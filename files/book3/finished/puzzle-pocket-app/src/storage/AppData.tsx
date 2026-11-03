// Loads the saved data when the app starts, and shares it with every screen.
// Each update is shown immediately and saved straight away, as the player
// plays, because a phone can close the game in the background without warning.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { useTheme } from '@/theme/theme';
import {
  clearNoughtsStats,
  clearSlidingStats,
  clearWordWheelStats,
  type NoughtsData,
  type Settings,
  type SlidingData,
  type WordWheelData,
} from './data';
import {
  loadAll,
  resetEverything,
  saveNoughts,
  saveSettings,
  saveSliding,
  saveWordWheel,
  type AllData,
} from './storage';

type AppDataValue = {
  data: AllData;
  setSettings: (settings: Settings) => void;
  setNoughts: (data: NoughtsData) => void;
  setSliding: (data: SlidingData) => void;
  setWordWheel: (data: WordWheelData) => void;
  resetStatistics: () => void;
  resetAll: () => Promise<void>;
};

const AppDataContext = createContext<AppDataValue | null>(null);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<AllData | null>(null);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    loadAll().then(setData);
    // Show a loading message only if loading takes more than a moment.
    const timer = setTimeout(() => setShowLoading(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const setSettings = useCallback((settings: Settings) => {
    setData((current) => current && { ...current, settings });
    saveSettings(settings);
  }, []);
  const setNoughts = useCallback((noughts: NoughtsData) => {
    setData((current) => current && { ...current, noughts });
    saveNoughts(noughts);
  }, []);
  const setSliding = useCallback((sliding: SlidingData) => {
    setData((current) => current && { ...current, sliding });
    saveSliding(sliding);
  }, []);
  const setWordWheel = useCallback((wordwheel: WordWheelData) => {
    setData((current) => current && { ...current, wordwheel });
    saveWordWheel(wordwheel);
  }, []);

  // Clears statistics for all puzzles, but keeps settings and games in progress.
  const resetStatistics = useCallback(() => {
    setData((current) => {
      if (!current) return current;
      const next = {
        ...current,
        noughts: clearNoughtsStats(current.noughts),
        sliding: clearSlidingStats(current.sliding),
        wordwheel: clearWordWheelStats(current.wordwheel),
      };
      saveNoughts(next.noughts);
      saveSliding(next.sliding);
      saveWordWheel(next.wordwheel);
      return next;
    });
  }, []);

  const resetAll = useCallback(async () => {
    setData(await resetEverything());
  }, []);

  const value = useMemo(
    () =>
      data && { data, setSettings, setNoughts, setSliding, setWordWheel, resetStatistics, resetAll },
    [data, setSettings, setNoughts, setSliding, setWordWheel, resetStatistics, resetAll]
  );

  if (!value) return <Loading visible={showLoading} />;
  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

function Loading({ visible }: { visible: boolean }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.loading, { backgroundColor: colors.background }]}>
      {visible && <AppText>Loading...</AppText>}
    </View>
  );
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) throw new Error('useAppData must be used inside AppDataProvider.');
  return value;
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
