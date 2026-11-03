// A message shown over the current screen, with a dimmed background, so it's
// the only thing to act on. The results dialog and every confirmation use it.
// The Android back gesture calls onRequestClose.

import type { ReactNode } from 'react';
import { Modal, StyleSheet, View } from 'react-native';

import { layout, radius, size, space, useTheme } from '@/theme/theme';
import { AppText } from './AppText';

type DialogProps = {
  visible: boolean;
  title: string;
  onRequestClose: () => void;
  children: ReactNode;
};

export function Dialog({ visible, title, onRequestClose, children }: DialogProps) {
  const { colors } = useTheme();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View
          accessibilityViewIsModal
          style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.divider }]}
        >
          <AppText variant="h2">{title}</AppText>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: layout.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    padding: space['4'],
  },
  box: {
    width: '100%',
    maxWidth: layout.maxDialogWidth,
    padding: space['4'],
    gap: space['3'],
    borderRadius: radius.card,
    borderWidth: size.borderThin,
  },
});
