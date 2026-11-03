// Noughts and crosses: two players on one phone, or against the computer,
// with undo and restart. The rules come from shared/rules.js, the same file
// the website's demo uses.

import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { chooseMove } from '../../shared/opponent.js';
import { canUndo, gameFromMoves, undoLastTurn } from '../../shared/history.js';
import { canMove, moveDescription, squareLabel, statusMessage } from '../../shared/rules.js';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Grid } from '@/components/Grid';
import { ResultsDialog } from '@/components/ResultsDialog';
import { Screen } from '@/components/Screen';
import { StatusLine } from '@/components/StatusLine';
import { Tile } from '@/components/Tile';
import { useFeedback } from '@/feedback/feedback';
import { useAppData } from '@/storage/AppData';
import { recordNoughtsGame, type NoughtsMode } from '@/storage/data';
import { space } from '@/theme/theme';

// The computer waits about half a second, so the player sees their own move first.
const COMPUTER_DELAY_MS = 500;

export default function Noughts() {
  const { data, setNoughts } = useAppData();
  const { feedbackMove, feedbackInvalid, feedbackWin } = useFeedback();

  const saved = data.noughts.game;
  const [mode, setMode] = useState<NoughtsMode | null>(saved?.mode ?? null);
  const [moves, setMoves] = useState<number[]>(saved?.moves ?? []);
  const [showResults, setShowResults] = useState(false);

  const game = useMemo(() => gameFromMoves(moves), [moves]);
  const againstComputer = mode === 'computer';
  const computerTurn = againstComputer && game.result === null && game.turn === 'O';

  // Saves the game after each move, and records the result when it ends.
  function update(nextMoves: number[]) {
    setMoves(nextMoves);
    const next = gameFromMoves(nextMoves);
    if (next.result === null) {
      setNoughts({ ...data.noughts, game: { mode: mode!, moves: nextMoves } });
      return;
    }
    const outcome = next.result.type === 'draw' ? 'draw' : next.result.player === 'X' ? 'win' : 'loss';
    setNoughts(recordNoughtsGame(data.noughts, mode!, outcome));
    if (next.result.type === 'win') feedbackWin();
    setShowResults(true);
  }

  // The computer's move.
  useEffect(() => {
    if (!computerTurn) return;
    const timer = setTimeout(() => {
      const square = chooseMove(game);
      if (square !== null) {
        feedbackMove();
        update([...moves, square]);
      }
    }, COMPUTER_DELAY_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [computerTurn, moves]);

  function play(index: number) {
    if (computerTurn) return;
    if (!canMove(game, index)) {
      feedbackInvalid();
      return;
    }
    feedbackMove();
    update([...moves, index]);
  }

  function start(newMode: NoughtsMode) {
    setMode(newMode);
    setMoves([]);
    setShowResults(false);
    setNoughts({ ...data.noughts, game: { mode: newMode, moves: [] } });
  }

  function undo() {
    const nextMoves = undoLastTurn(moves, againstComputer);
    setMoves(nextMoves);
    setNoughts({ ...data.noughts, game: { mode: mode!, moves: nextMoves } });
  }

  // Choose a mode at the start of each game.
  if (mode === null) {
    return (
      <Screen>
        <AppText variant="h2">Choose how to play</AppText>
        <AppText>Get three in a row, a column, or a diagonal to win. X always goes first.</AppText>
        <Button label="Two players" onPress={() => start('two-player')} accessibilityHint="Share this phone with a friend" />
        <Button label="Play the computer" onPress={() => start('computer')} accessibilityHint="You play X, and go first" />
      </Screen>
    );
  }

  const winningSquares: number[] = game.result?.type === 'win' ? game.result.squares : [];
  const lastMove = moves.at(-1);
  const status = computerTurn ? 'The computer is thinking...' : statusMessage(game);
  const announcement =
    lastMove === undefined ? status : `${moveDescription(lastMove, game.board[lastMove])} ${status}`;

  return (
    <Screen>
      <AppText variant="muted" style={styles.center}>
        {againstComputer ? 'You are X. The computer is O.' : 'Two players: X goes first.'}
      </AppText>
      <StatusLine text={status} announcement={announcement} />

      <Grid columns={3} accessibilityLabel="Noughts and crosses board">
        {game.board.map((mark: 'X' | 'O' | null, index: number) => (
          <Tile
            key={index}
            content={mark}
            highlighted={winningSquares.includes(index)}
            disabled={!canMove(game, index) || computerTurn}
            onPress={() => play(index)}
            accessibilityLabel={squareLabel(index, mark)}
          />
        ))}
      </Grid>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button
            label="Undo"
            variant="secondary"
            disabled={!canUndo(moves) || computerTurn}
            onPress={undo}
            accessibilityHint={againstComputer ? 'Takes back your last move and the computer\'s' : 'Takes back the last move'}
          />
        </View>
        <View style={styles.button}>
          <Button label="Restart" variant="secondary" onPress={() => start(mode)} />
        </View>
      </View>
      <Button label="Change mode" variant="secondary" onPress={() => setMode(null)} />

      <ResultsDialog
        visible={showResults}
        title={game.result?.type === 'draw' ? "It's a draw." : `${game.result?.player ?? ''} wins!`}
        lines={game.result ? [statusMessage(game)] : []}
        newBest={
          againstComputer && game.result?.type === 'win' && game.result.player === 'X' && data.noughts.currentStreak > 1
            ? `Win streak: ${data.noughts.currentStreak}`
            : undefined
        }
        onPlayAgain={() => start(mode)}
        onBackToHub={() => {
          setShowResults(false);
          router.back();
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  buttons: { flexDirection: 'row', gap: space['3'], marginTop: space['3'] },
  button: { flex: 1 },
});
