// The daily word wheel: make words from seven letters, with the center letter
// in every word. The rules come from shared/wordwheel.js. Everyone gets the
// same puzzle on the same day.

import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View, useWindowDimensions } from 'react-native';

import { checkGuess, scoreWord, totalScore } from '../../shared/wordwheel.js';
import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { ResultsDialog } from '@/components/ResultsDialog';
import { Screen } from '@/components/Screen';
import { StatusLine } from '@/components/StatusLine';
import { useFeedback } from '@/feedback/feedback';
import { useAppData } from '@/storage/AppData';
import { recordWord } from '@/storage/data';
import { fontSize, fonts, onAccent, radius, size, space, useTheme } from '@/theme/theme';
import { todaysPuzzle, wordList } from '@/words/words';

const LETTER_SIZE = size.touchTarget * 1.5;

export default function WordWheel() {
  const { colors } = useTheme();
  const { data, setWordWheel } = useAppData();
  const { feedbackWord, feedbackInvalid } = useFeedback();
  const puzzle = useMemo(() => todaysPuzzle(), []);

  const today = data.wordwheel.today?.date === puzzle.date ? data.wordwheel.today : null;
  const found = today?.found ?? [];
  const finished = today?.finished ?? false;
  const score = totalScore(found, puzzle.letters);

  const [outer, setOuter] = useState(puzzle.letters.replace(puzzle.center, '').split(''));
  const [current, setCurrent] = useState('');
  const [message, setMessage] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [showMissed, setShowMissed] = useState(false);

  function addLetter(letter: string) {
    if (finished) return;
    setMessage('');
    setCurrent((word) => word + letter);
  }

  function enter() {
    const result = checkGuess(current, puzzle, wordList, found);
    if (!result.ok) {
      // Keep the letters, so a small mistake can be fixed.
      setMessage(result.message ?? "");
      feedbackInvalid();
      return;
    }
    feedbackWord();
    setWordWheel(recordWord(data.wordwheel, puzzle.date, result.word, score + result.points));
    setMessage(`Accepted: ${result.word}, ${result.points} ${result.points === 1 ? 'point' : 'points'}`);
    setCurrent('');
  }

  function shuffleOuter() {
    setOuter((letters) => {
      const copy = [...letters];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    });
  }

  function finish() {
    setWordWheel({
      ...data.wordwheel,
      today: { date: puzzle.date, found, finished: true },
    });
    setCurrent('');
    setMessage('');
    setShowResults(true);
  }

  const missed = puzzle.answers.filter((word) => !found.includes(word));
  const isPangram = (word: string) => scoreWord(word, puzzle.letters) > word.length;

  return (
    <Screen>
      <AppText variant="muted" style={styles.center}>
        Puzzle {puzzle.number}. Make words of 4 letters or more. Every word must use the center letter.
      </AppText>

      <Wheel outer={outer} center={puzzle.center} disabled={finished} onLetter={addLetter} />

      <View
        accessible
        accessibilityLabel={current ? `Current word: ${current.split('').join(' ')}` : 'Current word: empty'}
        style={[styles.current, { borderColor: colors.border, backgroundColor: colors.surface }]}
      >
        <AppText style={styles.currentText}>{current.toUpperCase() || ' '}</AppText>
      </View>
      <StatusLine text={message} />

      <View style={styles.row}>
        <View style={styles.flex}>
          <Button label="Delete" variant="secondary" disabled={!current || finished} onPress={() => setCurrent((w) => w.slice(0, -1))} />
        </View>
        <View style={styles.flex}>
          <Button label="Shuffle" variant="secondary" disabled={finished} onPress={shuffleOuter} accessibilityHint="Rearranges the outer letters" />
        </View>
        <View style={styles.flex}>
          <Button label="Enter" disabled={!current || finished} onPress={enter} />
        </View>
      </View>

      <AppText variant="h3">
        {found.length} of {puzzle.answers.length} words · Score {score}
      </AppText>
      <AppText>{found.length ? [...found].sort().join(', ') : 'Words you find appear here.'}</AppText>

      {!finished && <Button label="Finish" variant="secondary" onPress={finish} accessibilityHint="Ends today's puzzle and shows the words you missed" />}

      {finished && (
        <>
          <AppText variant="muted">You've finished today's puzzle. A new one arrives tomorrow.</AppText>
          <Button label={showMissed ? 'Hide missed words' : 'Show missed words'} variant="secondary" onPress={() => setShowMissed((s) => !s)} />
        </>
      )}

      {finished && showMissed && (
        <View style={styles.missed}>
          <AppText variant="h3">Missed words</AppText>
          {missed.length === 0 && <AppText>You found every word!</AppText>}
          {missed.map((word) => (
            <AppText key={word} variant={isPangram(word) ? 'bold' : 'body'}>
              {word}
              {isPangram(word) ? ' (uses all seven letters)' : ''}
            </AppText>
          ))}
        </View>
      )}

      <ResultsDialog
        visible={showResults}
        title="Finished!"
        lines={[`Score: ${score}`, `Words found: ${found.length} of ${puzzle.answers.length}`]}
        newBest={score > 0 && score >= data.wordwheel.bestScore ? 'Your best score yet!' : undefined}
        onBackToHub={() => {
          setShowResults(false);
          router.back();
        }}
      >
        <Button
          label="Show missed words"
          onPress={() => {
            setShowResults(false);
            setShowMissed(true);
          }}
        />
      </ResultsDialog>
    </Screen>
  );
}

// Six letters around a circle, and one in the center in the accent color.
function Wheel({ outer, center, disabled, onLetter }: { outer: string[]; center: string; disabled: boolean; onLetter: (letter: string) => void }) {
  const { width } = useWindowDimensions();
  const wheel = Math.min(width - space['3'] * 2, LETTER_SIZE * 4.5);
  const distance = wheel / 2 - LETTER_SIZE / 2;

  return (
    <View style={[styles.wheel, { width: wheel, height: wheel }]} accessibilityLabel="Letter wheel">
      {outer.map((letter, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return (
          <Letter
            key={`${letter}-${i}`}
            letter={letter}
            disabled={disabled}
            onPress={() => onLetter(letter)}
            left={wheel / 2 + distance * Math.cos(angle) - LETTER_SIZE / 2}
            top={wheel / 2 + distance * Math.sin(angle) - LETTER_SIZE / 2}
          />
        );
      })}
      <Letter letter={center} isCenter disabled={disabled} onPress={() => onLetter(center)} left={wheel / 2 - LETTER_SIZE / 2} top={wheel / 2 - LETTER_SIZE / 2} />
    </View>
  );
}

function Letter({ letter, isCenter = false, disabled, onPress, left, top }: { letter: string; isCenter?: boolean; disabled: boolean; onPress: () => void; left: number; top: number }) {
  const { colors } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Letter ${letter.toUpperCase()}${isCenter ? ', center letter' : ''}`}
      accessibilityState={{ disabled }}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.letter,
        {
          left,
          top,
          backgroundColor: isCenter ? colors.accent : pressed ? colors['surface-tint'] : colors.surface,
          borderColor: isCenter ? onAccent : colors.primary,
          borderWidth: isCenter ? size.borderThick : size.border,
          opacity: disabled ? 0.6 : 1,
        },
      ]}
    >
      <AppText style={[styles.letterText, { color: isCenter ? onAccent : colors.text }]} allowFontScaling={false}>
        {letter.toUpperCase()}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  wheel: { alignSelf: 'center' },
  letter: {
    position: 'absolute',
    width: LETTER_SIZE,
    height: LETTER_SIZE,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
  },
  letterText: { fontFamily: fonts.bold, fontSize: fontSize.h2 },
  current: {
    minHeight: size.touchTarget,
    borderWidth: size.border,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space['2'],
  },
  currentText: { fontFamily: fonts.bold, fontSize: fontSize.h2, letterSpacing: space['1'] },
  row: { flexDirection: 'row', gap: space['2'] },
  flex: { flex: 1 },
  missed: { gap: space['1'] },
});
