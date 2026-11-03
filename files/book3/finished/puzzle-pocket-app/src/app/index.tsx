// The hub: today's word wheel, a button for each puzzle, and links to Stats
// and Settings. Opening any puzzle takes one tap.

import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Screen } from '@/components/Screen';
import { useAppData } from '@/storage/AppData';
import { fontSize, radius, size, space, useTheme } from '@/theme/theme';
import { todaysPuzzle } from '@/words/words';

export default function Hub() {
  const { colors } = useTheme();
  const { data } = useAppData();
  const puzzle = todaysPuzzle();

  const today = data.wordwheel.today?.date === puzzle.date ? data.wordwheel.today : null;
  const playedToday = (today?.found.length ?? 0) > 0;

  return (
    <Screen>
      <AppText variant="muted">Three classic puzzles, ready whenever you are.</AppText>

      {/* Today's word wheel */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Today's word wheel, puzzle ${puzzle.number}${playedToday ? `, ${today!.found.length} words found` : ', new'}`}
        onPress={() => router.push('/word-wheel')}
        style={({ pressed }) => [
          styles.daily,
          { backgroundColor: colors['surface-tint'], borderColor: colors.primary, opacity: pressed ? 0.85 : 1 },
        ]}
      >
        <View style={styles.dailyHeader}>
          <AppText variant="h3">Today's word wheel</AppText>
          {!playedToday && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <AppText variant="bold" style={{ color: colors['on-primary'] }}>
                New
              </AppText>
            </View>
          )}
        </View>
        <AppText style={styles.letters}>{puzzle.letters.toUpperCase().split('').join(' ')}</AppText>
        <AppText variant="muted">
          {playedToday
            ? `Puzzle ${puzzle.number}: ${today!.found.length} of ${puzzle.answers.length} words found`
            : `Puzzle ${puzzle.number}: find as many words as you can`}
        </AppText>
      </Pressable>

      {/* The three puzzles */}
      <AppText variant="h2" style={styles.sectionHeading}>
        Puzzles
      </AppText>
      <PuzzleButton
        title="Noughts and crosses"
        detail={data.noughts.game ? 'Continue your game' : 'Play a friend or the computer'}
        onPress={() => router.push('/noughts')}
      />
      <PuzzleButton
        title="Sliding numbers"
        detail={data.sliding.game ? 'Continue your game' : 'Slide the tiles into order'}
        onPress={() => router.push('/sliding')}
      />
      <PuzzleButton
        title="Word wheel"
        detail={today?.finished ? "Finished for today" : playedToday ? 'Continue today\'s puzzle' : 'A new puzzle every day'}
        onPress={() => router.push('/word-wheel')}
      />

      <View style={styles.links}>
        <View style={styles.link}>
          <Button label="Stats" variant="secondary" onPress={() => router.push('/stats')} />
        </View>
        <View style={styles.link}>
          <Button label="Settings" variant="secondary" onPress={() => router.push('/settings')} />
        </View>
      </View>

      {/* For testing only: the gallery is reachable only while developing. */}
      {__DEV__ && (
        <Button label="Component gallery (testing)" variant="secondary" onPress={() => router.push('/gallery')} />
      )}
    </Screen>
  );
}

function PuzzleButton({ title, detail, onPress }: { title: string; detail: string; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${detail}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.puzzle,
        { backgroundColor: pressed ? colors['surface-tint'] : colors.surface, borderColor: colors.divider },
      ]}
    >
      <AppText variant="h3">{title}</AppText>
      <AppText variant="muted">{detail}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  daily: {
    padding: space['4'],
    borderRadius: radius.card,
    borderWidth: size.border,
    gap: space['2'],
  },
  dailyHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: space['2'] },
  badge: { paddingHorizontal: space['3'], paddingVertical: space['1'], borderRadius: radius.button },
  letters: { letterSpacing: space['1'], fontSize: fontSize.h3 },
  sectionHeading: { marginTop: space['3'] },
  puzzle: {
    minHeight: size.touchTarget,
    padding: space['4'],
    borderRadius: radius.card,
    borderWidth: size.borderThin,
    gap: space['1'],
  },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: space['3'], marginTop: space['3'] },
  link: { flexGrow: 1, flexBasis: '40%' },
});
