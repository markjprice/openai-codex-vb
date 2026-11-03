// A line of status text that screen readers announce whenever it changes,
// such as "O's turn" or "X wins with the top row!" — a live region.

import { useEffect } from 'react';
import { AccessibilityInfo, Platform, StyleSheet } from 'react-native';

import { AppText } from './AppText';

export function StatusLine({ text, announcement }: { text: string; announcement?: string }) {
  // Android announces live regions itself. iPhone needs to be asked.
  useEffect(() => {
    if (Platform.OS === 'ios' && text) AccessibilityInfo.announceForAccessibility(announcement ?? text);
  }, [text, announcement]);

  return (
    <AppText variant="h3" accessibilityLiveRegion="polite" accessibilityLabel={announcement ?? text} style={styles.status}>
      {text}
    </AppText>
  );
}

const styles = StyleSheet.create({
  status: { textAlign: 'center' },
});
