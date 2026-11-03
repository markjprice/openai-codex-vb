// The message shown over a puzzle when a game ends: the result, any details,
// any new best score, and buttons for Play again and Back to hub.

import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { radius, space, useTheme } from '@/theme/theme';
import { AppText } from './AppText';
import { Button } from './Button';
import { Dialog } from './Dialog';

type ResultsDialogProps = {
  visible: boolean;
  title: string;
  lines?: string[];
  newBest?: string;
  onPlayAgain?: () => void; // Leave out for a puzzle that can't be played again, such as the daily word wheel
  onBackToHub: () => void;
  children?: ReactNode;
};

export function ResultsDialog({ visible, title, lines = [], newBest, onPlayAgain, onBackToHub, children }: ResultsDialogProps) {
  const { colors } = useTheme();
  return (
    <Dialog visible={visible} title={title} onRequestClose={onBackToHub}>
      {lines.map((line) => (
        <AppText key={line}>{line}</AppText>
      ))}
      {newBest && (
        <View style={[styles.best, { backgroundColor: colors['accent-soft'] }]}>
          <AppText variant="bold">{newBest}</AppText>
        </View>
      )}
      <View style={styles.buttons}>
        {children}
        {onPlayAgain && <Button label="Play again" onPress={onPlayAgain} />}
        <Button label="Back to hub" variant="secondary" onPress={onBackToHub} />
      </View>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  best: { paddingVertical: space['2'], paddingHorizontal: space['3'], borderRadius: radius.small },
  buttons: { gap: space['2'], marginTop: space['2'] },
});
