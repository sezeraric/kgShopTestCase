import 'react-native-gesture-handler/jestSetup';

/* global jest */

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');

global.__reanimatedWorkletInit = jest.fn(); 