// The frame around every screen: loads the fonts and saved data, sets up the
// stack of screens (the hub at the bottom, a puzzle on top), and opens the
// word wheel when the player taps the daily reminder.

import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { setUpReminderHandler } from '@/reminder/reminder';
import { AppDataProvider } from '@/storage/AppData';
import { fonts, useTheme } from '@/theme/theme';

SplashScreen.preventAutoHideAsync();
setUpReminderHandler();

export default function RootLayout() {
  const { colors, dark } = useTheme();
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: require('../../assets/fonts/AtkinsonHyperlegible-Regular.ttf'),
    [fonts.bold]: require('../../assets/fonts/AtkinsonHyperlegible-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) SplashScreen.hideAsync();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <AppDataProvider>
        {Platform.OS !== 'web' && <OpenWordWheelFromReminder />}
        <StatusBar style={dark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.surface },
            headerTintColor: colors.primary,
            headerTitleStyle: { fontFamily: fonts.bold, color: colors.text },
            headerBackButtonDisplayMode: 'minimal',
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Puzzle Pocket' }} />
          <Stack.Screen name="noughts" options={{ title: 'Noughts and crosses' }} />
          <Stack.Screen name="sliding" options={{ title: 'Sliding numbers' }} />
          <Stack.Screen name="word-wheel" options={{ title: 'Word wheel' }} />
          <Stack.Screen name="stats" options={{ title: 'Stats' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings' }} />
          <Stack.Screen name="gallery" options={{ title: 'Component gallery' }} />
        </Stack>
      </AppDataProvider>
    </SafeAreaProvider>
  );
}

// Tapping the daily reminder opens the game at today's word wheel.
function OpenWordWheelFromReminder() {
  const response = Notifications.useLastNotificationResponse();
  useEffect(() => {
    const screen = response?.notification.request.content.data?.screen;
    if (screen === '/word-wheel') router.push('/word-wheel');
  }, [response]);
  return null;
}
