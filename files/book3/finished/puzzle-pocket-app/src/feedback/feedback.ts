// All vibration and sound in one place. Each function checks the player's
// settings, then plays the right vibration and sound. Puzzles call these
// functions, and never play sounds or vibrations themselves.

import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { Platform } from 'react-native';

import { useAppData } from '@/storage/AppData';

const SOUNDS = {
  move: require('../../assets/sounds/move.wav'),
  word: require('../../assets/sounds/word.wav'),
  win: require('../../assets/sounds/win.wav'),
};

type SoundName = keyof typeof SOUNDS;

const players: Partial<Record<SoundName, AudioPlayer>> = {};
let audioReady = false;

// On iPhone, respect the silent switch: when the phone is on silent, the
// game makes no sound. Mix with other audio rather than stopping the
// player's music.
function prepareAudio() {
  if (audioReady) return;
  audioReady = true;
  setAudioModeAsync({ playsInSilentMode: false, interruptionMode: 'mixWithOthers' }).catch(() => {});
}

function playSound(name: SoundName) {
  try {
    prepareAudio();
    const player = (players[name] ??= createAudioPlayer(SOUNDS[name]));
    player.volume = 0.6;
    player.seekTo(0);
    player.play();
  } catch {
    // A sound that can't play is never a reason to stop the game.
  }
}

function vibrate(kind: 'tap' | 'warning' | 'success') {
  if (Platform.OS === 'web') return;
  const done = () => {};
  if (kind === 'tap') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(done);
  if (kind === 'warning') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(done);
  if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(done);
}

export function useFeedback() {
  const { sound, vibration } = useAppData().data.settings;

  return useMemo(
    () => ({
      // A tile slides, or a mark is placed.
      feedbackMove() {
        if (vibration) vibrate('tap');
        if (sound) playSound('move');
      },
      // A move isn't allowed, or a word is rejected. No sound for mistakes.
      feedbackInvalid() {
        if (vibration) vibrate('warning');
      },
      // A word is accepted.
      feedbackWord() {
        if (vibration) vibrate('tap');
        if (sound) playSound('word');
      },
      // A puzzle is won or solved.
      feedbackWin() {
        if (vibration) vibrate('success');
        if (sound) playSound('win');
      },
    }),
    [sound, vibration]
  );
}
