const Reanimated = require('react-native-reanimated/mock');

module.exports = {
  ...Reanimated,
  useDerivedValue: jest.fn((fn) => ({ value: fn() })),
};
