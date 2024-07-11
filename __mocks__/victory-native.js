const React = require('react');
const { View, Text } = require('react-native');

module.exports = {
  CartesianChart: ({ children }) => (
    <View>
      {children({ points: { total_calories: [], total_carbohydrates: [], total_protein: [], total_fats: [] }, chartBounds: {} })}
    </View>
  ),
  Line: () => <Text>Line</Text>,
  Bar: () => <Text>Bar</Text>,
  useChartPressState: () => ({
    state: {
      x: { position: { value: 0 } },
      y: {
        total_calories: { position: { value: 0 }, value: { value: 0 } },
        total_carbohydrates: { position: { value: 0 }, value: { value: 0 } },
        total_protein: { position: { value: 0 }, value: { value: 0 } },
        total_fats: { position: { value: 0 }, value: { value: 0 } },
      },
    },
    isActive: false,
  }),
};
