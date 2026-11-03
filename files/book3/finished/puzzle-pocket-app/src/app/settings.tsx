// Sound, vibration, the daily reminder, and resetting progress.
// Notification permission is requested here, and nowhere else: only after
// the player turns on Daily reminder and taps Continue.

import { useState } from 'react';
import { Linking, StyleSheet, Switch, View } from 'react-native';

import { AppText } from '@/components/AppText';
import { Button } from '@/components/Button';
import { Dialog } from '@/components/Dialog';
import { Screen } from '@/components/Screen';
import {
  cancelReminder,
  describeTime,
  remindersAvailable,
  requestPermission,
  scheduleDailyReminder,
  sendTestReminder,
  shiftTime,
} from '@/reminder/reminder';
import { REMINDER_TEXT } from '@/reminder/text';
import { useAppData } from '@/storage/AppData';
import { radius, size, space, useTheme } from '@/theme/theme';

type Confirm = 'statistics' | 'everything' | null;

export default function Settings() {
  const { colors } = useTheme();
  const { data, setSettings, resetStatistics, resetAll } = useAppData();
  const settings = data.settings;

  const [explaining, setExplaining] = useState(false);
  const [refused, setRefused] = useState(false);
  const [confirm, setConfirm] = useState<Confirm>(null);
  const [notice, setNotice] = useState('');

  function changeReminder(on: boolean) {
    if (on) {
      // Explain first. The system prompt appears only if the player taps Continue.
      setExplaining(true);
    } else {
      setSettings({ ...settings, reminder: false });
      cancelReminder();
    }
  }

  async function continueToPermission() {
    setExplaining(false);
    const allowed = await requestPermission();
    if (!allowed) {
      // The switch stays off, so the setting matches reality.
      setRefused(true);
      return;
    }
    setSettings({ ...settings, reminder: true });
    await scheduleDailyReminder(settings.reminderTime);
  }

  async function changeTime(minutes: number) {
    const reminderTime = shiftTime(settings.reminderTime, minutes);
    setSettings({ ...settings, reminderTime });
    if (settings.reminder) await scheduleDailyReminder(reminderTime);
  }

  async function doReset() {
    if (confirm === 'statistics') {
      resetStatistics();
      setNotice('Statistics reset. Your settings are unchanged.');
    } else if (confirm === 'everything') {
      await cancelReminder();
      await resetAll();
      setNotice('Everything reset.');
    }
    setConfirm(null);
  }

  return (
    <Screen>
      <Row
        label="Sound"
        description="Short sounds for moves and wins. Silent when your phone is on silent."
        value={settings.sound}
        onChange={(sound) => setSettings({ ...settings, sound })}
      />
      <Row
        label="Vibration"
        description="A gentle tap when you move, and a pattern when you win."
        value={settings.vibration}
        onChange={(vibration) => setSettings({ ...settings, vibration })}
      />

      {/* Notifications don't work in a web browser, so the setting is hidden there. */}
      {remindersAvailable && (
        <>
          <Row
            label={REMINDER_TEXT.switchLabel}
            description={REMINDER_TEXT.switchDescription}
            value={settings.reminder}
            onChange={changeReminder}
          />
          {settings.reminder && (
            <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
              <AppText variant="bold">
                {REMINDER_TEXT.timeLabel}: {describeTime(settings.reminderTime)}
              </AppText>
              <View style={styles.row}>
                <View style={styles.flex}>
                  <Button label="Earlier" variant="secondary" onPress={() => changeTime(-30)} accessibilityHint="Moves the reminder 30 minutes earlier" />
                </View>
                <View style={styles.flex}>
                  <Button label="Later" variant="secondary" onPress={() => changeTime(30)} accessibilityHint="Moves the reminder 30 minutes later" />
                </View>
              </View>
            </View>
          )}
          {/* For testing only. Never in a build you share. */}
          {__DEV__ && settings.reminder && (
            <Button
              label={REMINDER_TEXT.testButton}
              variant="secondary"
              onPress={async () => {
                await sendTestReminder();
                setNotice(REMINDER_TEXT.testConfirmation);
              }}
            />
          )}
        </>
      )}

      {notice !== '' && (
        <AppText accessibilityLiveRegion="polite" variant="bold">
          {notice}
        </AppText>
      )}

      <AppText variant="h3" style={styles.heading}>
        Start again
      </AppText>
      <Button label="Reset statistics" variant="secondary" onPress={() => setConfirm('statistics')} />
      <Button label="Reset everything" variant="secondary" onPress={() => setConfirm('everything')} />

      <AppText variant="h3" style={styles.heading}>
        About
      </AppText>
      <AppText variant="muted">
        Puzzle Pocket keeps your progress on this phone, and nowhere else.
      </AppText>
      <AppText variant="muted">
        Word list from SCOWL (Spell Checker Oriented Word Lists), copyright 2000-2016 by Kevin Atkinson, used
        with permission. Font: Atkinson Hyperlegible by the Braille Institute of America, under the SIL Open
        Font License.
      </AppText>

      <Dialog visible={explaining} title={REMINDER_TEXT.explanationTitle} onRequestClose={() => { setExplaining(false); setRefused(true); }}>
        <AppText>{REMINDER_TEXT.explanationMessage}</AppText>
        <Button label={REMINDER_TEXT.continueButton} onPress={continueToPermission} />
        <Button label={REMINDER_TEXT.notNowButton} variant="secondary" onPress={() => { setExplaining(false); setRefused(true); }} />
      </Dialog>

      <Dialog visible={refused} title="Reminders are off" onRequestClose={() => setRefused(false)}>
        <AppText>{REMINDER_TEXT.refusedMessage}</AppText>
        <Button label={REMINDER_TEXT.openSettingsButton} onPress={() => { setRefused(false); Linking.openSettings(); }} />
        <Button label={REMINDER_TEXT.okButton} variant="secondary" onPress={() => setRefused(false)} />
      </Dialog>

      <Dialog
        visible={confirm !== null}
        title={confirm === 'statistics' ? 'Reset all statistics?' : 'Reset everything?'}
        onRequestClose={() => setConfirm(null)}
      >
        <AppText>
          {confirm === 'statistics'
            ? "Your best times, streaks, and scores for all three puzzles will be deleted. This can't be undone."
            : "Your statistics, games in progress, and settings will be deleted, and the daily reminder will be turned off. This can't be undone."}
        </AppText>
        <Button label="Reset" onPress={doReset} />
        <Button label="Cancel" variant="secondary" onPress={() => setConfirm(null)} />
      </Dialog>
    </Screen>
  );
}

function Row({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (value: boolean) => void }) {
  const { colors } = useTheme();
  return (
    <View style={[styles.card, styles.switchRow, { backgroundColor: colors.surface, borderColor: colors.divider }]}>
      <View style={styles.flex}>
        <AppText variant="bold">{label}</AppText>
        <AppText variant="muted">{description}</AppText>
      </View>
      <Switch
        accessibilityLabel={label}
        accessibilityHint={description}
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.primary, false: colors.border }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: space['3'], borderRadius: radius.card, borderWidth: size.borderThin, gap: space['2'] },
  switchRow: { flexDirection: 'row', alignItems: 'center', gap: space['3'], minHeight: size.touchTarget },
  row: { flexDirection: 'row', gap: space['2'] },
  flex: { flex: 1 },
  heading: { marginTop: space['4'] },
});
