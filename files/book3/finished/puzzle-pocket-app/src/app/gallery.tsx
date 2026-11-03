// The component gallery: every shared component in each of its states, for
// checking on a phone. For testing only. The hub links here only while
// developing, so it isn't reachable in a build you share.

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { ResultsDialog } from '@/components/ResultsDialog';
import { Screen } from '@/components/Screen';
import { Tile } from '@/components/Tile';
import { space } from '@/theme/theme';

type DialogState = 'win' | 'draw' | 'best' | 'extra' | null;

export default function Gallery() {
  const [dialog, setDialog] = useState<DialogState>(null);
  const close = () => setDialog(null);

  return (
    <Screen>
      <AppText variant="h2">Tile states</AppText>
      <Grid columns={3} accessibilityLabel="Tile states">
        <Tile accessibilityLabel="Empty" />
        <Tile content="X" accessibilityLabel="X" />
        <Tile content="O" accessibilityLabel="O" />
        <Tile content={7} accessibilityLabel="Number 7" />
        <Tile content="X" highlighted accessibilityLabel="Highlighted X" />
        <Tile content="O" highlighted accessibilityLabel="Highlighted O" />
        <Tile content={12} highlighted accessibilityLabel="Highlighted number 12" />
        <Tile disabled accessibilityLabel="Disabled empty" />
        <Tile content="X" disabled accessibilityLabel="Disabled X" />
      </Grid>
      <AppText variant="muted" style={styles.caption}>
        Empty, X, O, number, highlighted X, O, and number, disabled empty, disabled X
      </AppText>

      <AppText variant="h2">4 by 4 grid</AppText>
      <Grid columns={4} accessibilityLabel="4 by 4 grid">
        {Array.from({ length: 16 }, (_, i) => (
          <Tile key={i} content={i === 15 ? null : i + 1} accessibilityLabel={`Tile ${i + 1}`} />
        ))}
      </Grid>

      <AppText variant="h2">Buttons</AppText>
      <Button label="Primary" onPress={() => {}} />
      <Button label="Secondary" variant="secondary" onPress={() => {}} />
      <Button label="Primary, disabled" disabled onPress={() => {}} />
      <Button label="Secondary, disabled" variant="secondary" disabled onPress={() => {}} />
      <Button label="A long label that should wrap onto a second line at the largest text size" onPress={() => {}} />

      <AppText variant="h2">Results dialog</AppText>
      <View style={styles.row}>
        <Button label="Win" variant="secondary" onPress={() => setDialog('win')} />
        <Button label="Draw" variant="secondary" onPress={() => setDialog('draw')} />
        <Button label="New best" variant="secondary" onPress={() => setDialog('best')} />
        <Button label="Extra action" variant="secondary" onPress={() => setDialog('extra')} />
      </View>

      <ResultsDialog
        visible={dialog === 'win' || dialog === 'draw' || dialog === 'best'}
        title={dialog === 'draw' ? "It's a draw." : dialog === 'best' ? 'Solved!' : 'X wins!'}
        lines={dialog === 'best' ? ['87 moves', 'Time: 2:07'] : dialog === 'draw' ? [] : ['X wins with the top row!']}
        newBest={dialog === 'best' ? 'New best time!' : undefined}
        onPlayAgain={close}
        onBackToHub={close}
      />
      <ResultsDialog visible={dialog === 'extra'} title="Finished!" lines={['Score: 42', 'Words found: 12 of 38']} onBackToHub={close}>
        <Button label="Show missed words" onPress={close} />
      </ResultsDialog>
    </Screen>
  );
}

const styles = StyleSheet.create({
  caption: { textAlign: 'center' },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: space['2'] },
});
