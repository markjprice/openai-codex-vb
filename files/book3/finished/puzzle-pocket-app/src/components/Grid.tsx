// Arranges tiles in rows and columns, and sizes them to fit the screen.
// Tiles are square, never smaller than the touch target, and never larger
// than the board-square token.

import { Children, type ReactNode } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import { layout, size, space } from '@/theme/theme';

type GridProps = {
  columns: number;
  children: ReactNode;
  accessibilityLabel: string;
};

export function Grid({ columns, children, accessibilityLabel }: GridProps) {
  const { width } = useWindowDimensions();
  const gap = space['2'];
  const available = Math.min(width, layout.maxContentWidth) - space['3'] * 2;
  const tile = Math.max(size.touchTarget, Math.min(size.tileMax, (available - gap * (columns - 1)) / columns));

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      style={[styles.grid, { width: tile * columns + gap * (columns - 1), gap }]}
    >
      {Children.map(children, (child) => (
        <View style={{ width: tile, height: tile }}>{child}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', alignSelf: 'center' },
});
