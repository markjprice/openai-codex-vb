// One square in a grid. It shows X, O, a number, or nothing.
// A highlighted tile uses the accent color and a thick outline, so it
// doesn't rely on color alone.

import { Pressable, StyleSheet, View } from 'react-native';

import { fontSize, fonts, onAccent, radius, size, useTheme } from '@/theme/theme';
import { AppText } from './AppText';

type TileProps = {
  content?: 'X' | 'O' | number | null;
  highlighted?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel: string;
};

export function Tile({ content = null, highlighted = false, disabled = false, onPress, accessibilityLabel }: TileProps) {
  const { colors } = useTheme();
  const isNumber = typeof content === 'number';

  const background = highlighted ? colors.accent : isNumber ? colors.surface : colors.background;
  const borderColor = highlighted ? colors.text : colors.border;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled, selected: highlighted }}
      // Disabled tiles stay visible, but taps do nothing.
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => [
        styles.tile,
        {
          backgroundColor: pressed && !disabled ? colors['surface-tint'] : background,
          borderColor,
          borderWidth: highlighted ? size.borderThick : size.border,
        },
      ]}
    >
      {content === 'X' && <Cross color={highlighted ? onAccent : colors.text} />}
      {content === 'O' && <Nought color={highlighted ? onAccent : colors.primary} />}
      {isNumber && (
        <AppText style={[styles.number, { color: highlighted ? onAccent : colors.text }]} allowFontScaling={false}>
          {content}
        </AppText>
      )}
    </Pressable>
  );
}

// X and O are drawn as large shapes, not letters, so they're easy to tell apart.
function Cross({ color }: { color: string }) {
  return (
    <View style={styles.mark}>
      <View style={[styles.crossLine, { backgroundColor: color, transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.crossLine, { backgroundColor: color, transform: [{ rotate: '-45deg' }] }]} />
    </View>
  );
}

function Nought({ color }: { color: string }) {
  return (
    <View style={styles.mark}>
      <View style={[styles.nought, { borderColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: radius.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontFamily: fonts.bold,
    fontSize: fontSize.h3,
  },
  mark: {
    width: '60%',
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossLine: {
    position: 'absolute',
    width: '115%',
    height: '16%',
    borderRadius: radius.button,
  },
  nought: {
    width: '100%',
    height: '100%',
    borderRadius: radius.button,
    borderWidth: size.borderThick * 2,
  },
});
