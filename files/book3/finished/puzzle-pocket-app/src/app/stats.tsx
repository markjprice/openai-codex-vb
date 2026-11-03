// Best times, win streaks, and games played for each puzzle.
// Every number follows the definitions in STORAGE.md.

import { StyleSheet, View } from 'react-native';

import { formatTime } from '../../shared/sliding.js';
import { dateKey } from '../../shared/daily.js';
import { totalScore } from '../../shared/wordwheel.js';
import { AppText } from '@/components/AppText';
import { Screen } from '@/components/Screen';
import { useAppData } from '@/storage/AppData';
import { radius, size, space, useTheme } from '@/theme/theme';
import { todaysPuzzle } from '@/words/words';

export default function Stats() {
  const { noughts, sliding, wordwheel } = useAppData().data;
  const today = wordwheel.today?.date === dateKey() ? wordwheel.today : null;
  const todayScore = today ? totalScore(today.found, todaysPuzzle().letters) : 0;

  return (
    <Screen>
      <AppText variant="muted">Saved on this phone only.</AppText>

      <Section title="Noughts and crosses">
        {noughts.played === 0 ? (
          <AppText>Finish a game to see your stats.</AppText>
        ) : (
          <>
            <Stat label="Games played" value={noughts.played} />
            <Stat label="Wins against the computer" value={noughts.computerWins} />
            <Stat label="Current win streak" value={noughts.currentStreak} />
            <Stat label="Best win streak" value={noughts.bestStreak} />
          </>
        )}
      </Section>

      <Section title="Sliding numbers">
        {sliding.solved === 0 ? (
          <AppText>Solve a puzzle to see your best time.</AppText>
        ) : (
          <>
            <Stat label="Games solved" value={sliding.solved} />
            <Stat label="Best time" value={formatTime(sliding.bestTime ?? 0)} />
            <Stat label="Fewest moves" value={sliding.fewestMoves ?? 0} />
          </>
        )}
      </Section>

      <Section title="Word wheel">
        {wordwheel.daysInARow === 0 ? (
          <AppText>Find a word in today's puzzle to start your streak.</AppText>
        ) : (
          <>
            <Stat label="Days played in a row" value={wordwheel.daysInARow} />
            <Stat label="Best score" value={wordwheel.bestScore} />
            <Stat label="Today's score" value={todayScore} />
          </>
        )}
      </Section>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.section, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
      <AppText variant="h3" style={{ color: colors.primary }}>
        {title}
      </AppText>
      {children}
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <View accessible accessibilityLabel={`${label}: ${value}`} style={styles.stat}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText variant="h3">{String(value)}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { padding: space['4'], borderRadius: radius.card, borderWidth: size.borderThin, gap: space['2'] },
  stat: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: space['3'], flexWrap: 'wrap' },
  label: { flexShrink: 1 },
});
