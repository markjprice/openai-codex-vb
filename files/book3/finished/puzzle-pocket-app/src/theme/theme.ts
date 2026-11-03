// The game's theme: every color, size, space, and font, read from
// shared/design-tokens.json so the game looks like the website.
//
// Never type a color or size in a component. Change design-tokens.json,
// copy it to both projects, and the website and the game stay the same.

import { useColorScheme } from 'react-native';

import tokens from '../../shared/design-tokens.json';

// Websites measure in pixels ("16px"). React Native measures in its own
// units, which keep sizes physically similar on every phone. Convert "16px"
// to the number 16, without changing the token file.
const toNumber = (value: string) => parseFloat(value);

function numbers<T extends Record<string, string>>(group: T) {
  return Object.fromEntries(
    Object.entries(group).map(([key, value]) => [key, toNumber(value)])
  ) as { [K in keyof T]: number };
}

export type Colors = typeof tokens.color;

export const lightColors: Colors = tokens.color;
export const darkColors: Colors = tokens['color-dark'];

export const space = numbers(tokens.space);
export const radius = numbers(tokens.radius);

export const size = {
  touchTarget: toNumber(tokens.size['touch-target']),
  icon: toNumber(tokens.size.icon),
  iconLarge: toNumber(tokens.size['icon-large']),
  iconBox: toNumber(tokens.size['icon-box']),
  tileMax: toNumber(tokens.size['board-square']),
  borderThin: toNumber(tokens.size['border-thin']),
  border: toNumber(tokens.size.border),
  borderThick: toNumber(tokens.size['border-thick']),
  focusOutline: toNumber(tokens.size['focus-outline']),
};

// The font files are bundled with the app and loaded in src/app/_layout.tsx.
export const fonts = {
  regular: 'AtkinsonHyperlegible-Regular',
  bold: 'AtkinsonHyperlegible-Bold',
};

export const fontSize = {
  small: toNumber(tokens.font['size-small']),
  body: toNumber(tokens.font['size-body']),
  h3: toNumber(tokens.font['size-h3']),
  h2: toNumber(tokens.font['size-h2']),
  h1: toNumber(tokens.font['size-h1']),
  display: toNumber(tokens.font['size-display']),
};

export const lineHeight = {
  body: Number(tokens.font['line-height-body']),
  heading: Number(tokens.font['line-height-heading']),
};

// Layout limits that aren't design tokens: how wide content may grow on a
// tablet, and the dimmed layer behind dialogs.
export const layout = {
  maxContentWidth: 640,
  maxDialogWidth: 420,
  overlay: 'rgba(0, 0, 0, 0.5)',
};

// Text on the accent color is always the light theme's text color, because
// the accent color is the same in light and dark mode.
export const onAccent = lightColors.text;

export type Theme = {
  colors: Colors;
  dark: boolean;
};

// The colors for the phone's current light or dark mode.
export function useTheme(): Theme {
  const dark = useColorScheme() === 'dark';
  return { colors: dark ? darkColors : lightColors, dark };
}
