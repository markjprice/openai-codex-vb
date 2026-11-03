// The game's standard button: primary for the main action on a screen,
// secondary for everything else. At least 44 points tall, with rounded ends.

import { Pressable, StyleSheet } from 'react-native';

import { fontSize, fonts, radius, size, space, useTheme } from '@/theme/theme';
import { AppText } from './AppText';

type ButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  accessibilityHint?: string;
};

export function Button({ label, onPress, variant = 'primary', disabled = false, accessibilityHint }: ButtonProps) {
  const { colors } = useTheme();
  const primary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary ? colors.primary : colors.surface,
          borderColor: colors.primary,
          opacity: disabled ? 0.45 : pressed ? 0.8 : 1,
        },
      ]}
    >
      <AppText style={[styles.label, { color: primary ? colors['on-primary'] : colors.primary }]}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: size.touchTarget,
    paddingVertical: space['2'],
    paddingHorizontal: space['4'],
    borderRadius: radius.button,
    borderWidth: size.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: fontSize.body,
    textAlign: 'center',
  },
});
