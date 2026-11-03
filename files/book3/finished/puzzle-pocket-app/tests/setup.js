// Runs before every test file. Replaces the phone's storage with a fake one
// that keeps everything in memory, so storage tests run without a phone.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
