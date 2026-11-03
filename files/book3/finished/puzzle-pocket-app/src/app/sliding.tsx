// The sliding number puzzle: tap a tile next to the empty space to slide it.
// The rules come from shared/sliding.js. The shuffle always makes a board
// that can be solved.

import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, AppState, StyleSheet, View } from 'react-native';

import {
  canMove,
  describeTime,
  formatTime,
  isSolved,
  move,
  shuffle,
  solvedBoard,
  tileLabel,
} from '../../shared/sliding.js';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { ResultsDialog } from '@/components/ResultsDialog';
import { Screen } from '@/components/Screen';
import { StatusLine } from '@/components/StatusLine';
import { Tile } from '@/components/Tile';
import { useFeedback } from '@/feedback/feedback';
import { useAppData } from '@/storage/AppData';
import { recordSlidingSolve } from '@/storage/data';
import { space } from '@/theme/theme';

const CELEBRATION_STEP_MS = 50;

export default function Sliding() {
  const { data, setSliding } = useAppData();
  const { feedbackMove, feedbackInvalid, feedbackWin } = useFeedback();

  const saved = data.sliding.game;
  const [board, setBoard] = useState<number[]>(() => saved?.board ?? shuffle());
  const [moves, setMoves] = useState(saved?.moves ?? 0);
  const [seconds, setSeconds] = useState(saved?.seconds ?? 0);
  const [active, setActive] = useState(AppState.currentState === 'active');
  const [solved, setSolved] = useState(false);
  const [celebrating, setCelebrating] = useState(0); // how many tiles are lit
  const [result, setResult] = useState<{ newBest?: string } | null>(null);

  // Keep the latest values for saving when the app goes to the background.
  const latest = useRef({ board, moves, seconds, solved });
  latest.current = { board, moves, seconds, solved };

  // The timer starts at the first move, and pauses when the app is in the background.
  const running = moves > 0 && !solved && active;
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setSeconds((s: number) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [running]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      setActive(state === 'active');
      // Save the time so far, in case the phone closes the game in the background.
      const { board: b, moves: m, seconds: s, solved: done } = latest.current;
      if (state !== 'active' && !done && m > 0) {
        setSliding({ ...data.sliding, game: { board: b, moves: m, seconds: s } });
      }
    });
    return () => subscription.remove();
  }, [data.sliding, setSliding]);

  function tap(index: number) {
    if (solved) return;
    if (!canMove(board, index)) {
      feedbackInvalid();
      return;
    }
    const next = move(board, index);
    const nextMoves = moves + 1;
    feedbackMove();
    setBoard(next);
    setMoves(nextMoves);

    if (isSolved(next)) {
      finish(nextMoves, seconds);
    } else {
      setSliding({ ...data.sliding, game: { board: next, moves: nextMoves, seconds } });
    }
  }

  async function finish(finalMoves: number, finalSeconds: number) {
    setSolved(true);
    feedbackWin();

    const before = data.sliding;
    const after = recordSlidingSolve(before, finalMoves, finalSeconds);
    setSliding(after);

    const bests = [];
    if (before.bestTime === null || finalSeconds < before.bestTime) bests.push('New best time!');
    if (before.fewestMoves === null || finalMoves < before.fewestMoves) bests.push('New fewest moves!');

    // A short celebration: the tiles light up in order. Skipped if the player
    // has turned on reduced motion.
    const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled().catch(() => false);
    if (!reduceMotion) {
      for (let lit = 1; lit <= 15; lit++) {
        setCelebrating(lit);
        await new Promise((resolve) => setTimeout(resolve, CELEBRATION_STEP_MS));
      }
      setCelebrating(0);
    }
    setResult({ newBest: before.solved === 0 ? undefined : bests.join(' ') || undefined });
  }

  function newGame(startBoard = shuffle()) {
    setBoard(startBoard);
    setMoves(0);
    setSeconds(0);
    setSolved(false);
    setResult(null);
    setSliding({ ...data.sliding, game: { board: startBoard, moves: 0, seconds: 0 } });
  }

  const status = solved ? `Solved in ${moves} moves and ${describeTime(seconds)}` : '';

  return (
    <Screen>
      <View style={styles.counters}>
        <Counter label="Moves" value={String(moves)} />
        <Counter label="Time" value={formatTime(seconds)} spoken={describeTime(seconds)} />
      </View>
      <StatusLine text={status} />

      <Grid columns={4} accessibilityLabel="Sliding number board">
        {board.map((tile, index) => (
          <Tile
            key={index}
            content={tile === 0 ? null : tile}
            highlighted={tile !== 0 && tile <= celebrating}
            disabled={solved}
            onPress={() => tap(index)}
            accessibilityLabel={tileLabel(board, index)}
          />
        ))}
      </Grid>

      <AppText variant="muted" style={styles.center}>
        Tap a tile next to the empty space to slide it. Put the tiles in order, from 1 in the top left.
      </AppText>
      <Button label="New game" variant="secondary" onPress={() => newGame()} />

      {/* For testing only: start one move from solved. Never in a build you share. */}
      {__DEV__ && (
        <Button
          label="Start one move from solved (testing)"
          variant="secondary"
          onPress={() => newGame(move(solvedBoard(), 14))}
        />
      )}

      <ResultsDialog
        visible={result !== null}
        title="Solved!"
        lines={[`${moves} moves`, `Time: ${formatTime(seconds)}`]}
        newBest={result?.newBest}
        onPlayAgain={() => newGame()}
        onBackToHub={() => {
          setResult(null);
          router.back();
        }}
      />
    </Screen>
  );
}

function Counter({ label, value, spoken }: { label: string; value: string; spoken?: string }) {
  return (
    <View accessible accessibilityLabel={`${label}: ${spoken ?? value}`} style={styles.counter}>
      <AppText variant="muted">{label}</AppText>
      <AppText variant="h2">{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  counters: { flexDirection: 'row', justifyContent: 'space-around', gap: space['3'] },
  counter: { alignItems: 'center' },
  center: { textAlign: 'center' },
});
