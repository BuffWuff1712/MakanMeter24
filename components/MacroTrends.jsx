import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont, Text as SKText } from '@shopify/react-native-skia';
import poppins from "../assets/fonts/Poppins-SemiBold.ttf";
import { useDerivedValue } from 'react-native-reanimated';
import TrendsDateRange from './TrendsDateRange';
import { useGlobalContext } from '../context/GlobalProvider';


const MacroTrendsDashboard = ({ data, onPress }) => {
  const { period } = useGlobalContext();
  const font = useFont(poppins, 12);
  const toolTipFont = useFont(poppins, 14);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { total_calories: 0 },
  });

  const value = useDerivedValue(() => {
    return state.y.total_calories.value.value + " kcal";
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.total_calories.position.value - 15;
  }, [value]);

  const textXPosition = useDerivedValue(() => {
    if (!toolTipFont) {
      return 0;
    }
    return (
      state.x.position.value - toolTipFont.measureText(value.value).width / 2
    );
  }, [value, toolTipFont]);

  // Calculate the maximum value among all macros
  const maxMacroValue = data.length > 0 ? Math.max(
    ...data.flatMap(item => [item.total_carbohydrates, item.total_fats, item.total_protein])
  ) : 0;

  return (
    data.length > 0 ?
    <View style={styles.container}>
      <View className="my-2 mx-3">
        <Pressable onPress={onPress}>
          <Text className="text-2xl font-semibold">Macros Intake</Text>
        </Pressable>
      </View>
      <View className="items-end">
        <TrendsDateRange />
      </View>
      <CartesianChart
        data={data}
        chartPressState={state}
        xKey={period === 1 ? "week_start_date" : "meal_date"}
        yKeys={["total_carbohydrates", "total_protein", "total_fats"]}
        padding={15}
        domain={{ y: [0, maxMacroValue + 100] }}
        domainPadding={{ top: 30, left: 30, right: 30 }}
        // 👇 pass the font, opting in to axes.
        axisOptions={{ font }}
      >
        {({ points }) => {
          return (
            <>
              <Line
                points={points.total_carbohydrates}
                color="red"
                strokeWidth={3}
                animate={{ type: "timing", duration: 1000 }}
              />
              <Line
                points={points.total_protein}
                color="blue"
                strokeWidth={3}
                animate={{ type: "timing", duration: 1000 }}
              />
              <Line
                points={points.total_fats}
                color="darkgreen"
                strokeWidth={3}
                animate={{ type: "timing", duration: 1000 }}
              />
              {isActive ? (
                <>
                  <SKText
                    font={toolTipFont}
                    color={"black"}
                    x={textXPosition}
                    y={textYPosition}
                    text={value}
                  />
                  <Circle
                    cx={state.x.position}
                    cy={state.y.total_calories.position}
                    r={8}
                    color={"grey"}
                    opacity={0.8}
                  />
                </>
              ) : null}
            </>
          );
        }}
      </CartesianChart>
    </View>
    :
    <View style={styles.emptyContainer}>
        <Text className='text-xl font-semibold'>No macro intake data available.</Text>
        <Text style={styles.emptyText}>Start by logging in your meal today!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: "85%",
    width: "90%",
    borderRadius: 10,
    padding: 4,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: "85%", 
    width: "90%",
    borderRadius: 10,
    padding: 4,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  emptyText: {
    fontSize: 15,
    color: 'gray',
  },
});

export default MacroTrendsDashboard;
