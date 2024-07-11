const React = require('react');
const { View, Text } = require('react-native');

module.exports = {
  Circle: () => <View />,
  useFont: () => null,
  vec: () => null,
  LinearGradient: () => <View />,
  Text: () => <Text />,
  Canvas: () => <View />,
  Path: () => <View />,
  useValue: () => ({ current: 0 }),
  useDerivedValue: (fn) => ({ value: fn() }),
  useComputedValue: () => ({ current: 0 }),
  useTouchHandler: () => null,
};
