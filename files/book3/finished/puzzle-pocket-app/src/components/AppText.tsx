// Text in the game's font and colors. Sizes follow the player's text size
// setting, rather than being fixed.

import { Text, type TextProps } from 'react-native';

import { fontSize, fonts, lineHeight, useTheme } from '@/theme/theme';

type Variant = 'body' | 'bold' | 'small' | 'muted' | 'h1' | 'h2' | 'h3' | 'display';

const VARIANTS = {
  body: { fontFamily: fonts.regular, fontSize: fontSize.body, lineHeight: fontSize.body * lineHeight.body },
  bold: { fontFamily: fonts.bold, fontSize: fontSize.body, lineHeight: fontSize.body * lineHeight.body },
  small: { fontFamily: fonts.regular, fontSize: fontSize.small, lineHeight: fontSize.small * lineHeight.body },
  muted: { fontFamily: fonts.regular, fontSize: fontSize.small, lineHeight: fontSize.small * lineHeight.body },
  h3: { fontFamily: fonts.bold, fontSize: fontSize.h3, lineHeight: fontSize.h3 * lineHeight.heading },
  h2: { fontFamily: fonts.bold, fontSize: fontSize.h2, lineHeight: fontSize.h2 * lineHeight.heading },
  h1: { fontFamily: fonts.bold, fontSize: fontSize.h1, lineHeight: fontSize.h1 * lineHeight.heading },
  display: { fontFamily: fonts.bold, fontSize: fontSize.display, lineHeight: fontSize.display * lineHeight.heading },
};

export function AppText({ variant = 'body', style, ...props }: TextProps & { variant?: Variant }) {
  const { colors } = useTheme();
  const color = variant === 'muted' ? colors['text-muted'] : colors.text;
  const isHeading = variant === 'h1' || variant === 'h2' || variant === 'h3';
  return (
    <Text
      accessibilityRole={isHeading ? 'header' : undefined}
      {...props}
      style={[VARIANTS[variant], { color }, style]}
    />
  );
}
