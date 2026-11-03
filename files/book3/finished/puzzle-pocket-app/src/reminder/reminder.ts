// The daily reminder: a local notification, created and scheduled on the
// phone itself, without any server. Nothing is sent anywhere.
//
// Permission is requested only from the Daily reminder setting, after the
// player has read the game's own explanation and tapped Continue.

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { REMINDER_TEXT } from './text';

const CHANNEL_ID = 'daily-reminder';

// Notifications don't work in the web version, so the setting is hidden there.
export const remindersAvailable = Platform.OS !== 'web';

// Show the reminder even if the game happens to be open.
export function setUpReminderHandler() {
  if (!remindersAvailable) return;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

// Android groups notifications into channels that players can control
// separately. Create one channel before scheduling.
async function ensureChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: REMINDER_TEXT.channelName,
    description: REMINDER_TEXT.channelDescription,
    importance: Notifications.AndroidImportance.DEFAULT,
  });
}

// Shows the system prompt, if the player hasn't already answered it.
// Returns true when notifications are allowed.
export async function requestPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  const answer = await Notifications.requestPermissionsAsync();
  return answer.granted;
}

const content = {
  title: REMINDER_TEXT.notificationTitle,
  body: REMINDER_TEXT.notificationBody,
  data: { screen: '/word-wheel' },
};

// Schedules one reminder a day at "HH:MM". Only one reminder is ever
// scheduled: any earlier one is cancelled first.
export async function scheduleDailyReminder(time: string) {
  await cancelReminder();
  await ensureChannel();
  const [hour, minute] = time.split(':').map(Number);
  await Notifications.scheduleNotificationAsync({
    content,
    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute, channelId: CHANNEL_ID },
  });
}

export async function cancelReminder() {
  if (!remindersAvailable) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

// For testing only: a reminder one minute from now. The button that calls
// this appears only in development builds.
export async function sendTestReminder() {
  await ensureChannel();
  await Notifications.scheduleNotificationAsync({
    content,
    trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: 60, channelId: CHANNEL_ID },
  });
}

// "09:00" as "9:00 a.m."
export function describeTime(time: string) {
  const [hour, minute] = time.split(':').map(Number);
  const suffix = hour < 12 ? 'a.m.' : 'p.m.';
  const twelveHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelveHour}:${String(minute).padStart(2, '0')} ${suffix}`;
}

// Moves a time earlier or later by 30 minutes, wrapping around midnight.
export function shiftTime(time: string, minutes: number) {
  const [hour, minute] = time.split(':').map(Number);
  const total = (((hour * 60 + minute + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}
