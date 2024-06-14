import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Bar, CartesianChart, Line, Pie, PolarChart, useChartPressState } from 'victory-native';
import { Dimensions } from 'react-native';
import { Circle, useFont, vec, LinearGradient, Text as SKText } from '@shopify/react-native-skia';
import poppins from "../assets/fonts/Poppins-SemiBold.ttf"
import { useDerivedValue } from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';
import TrendsDateRange from './TrendsDateRange';
import { useGlobalContext } from '../context/GlobalProvider';

const screenWidth = Dimensions.get('window').width;



const DailyTrendsDashboard = ({ data, onPress }) => {
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

  // Calculate the maximum total_calories value
  const maxCalories = Math.max(...data.map(item => item.total_calories));
  
  // Calculate the average total_calories value
  const totalCalories = data.reduce((sum, item) => sum + item.total_calories, 0);
  const averageCalories = Math.round(totalCalories / data.length);

  return (
    <View style={styles.container}>
      <View className="my-2 mx-3">
        <Pressable onPress={onPress}>
          <Text className="text-2xl font-semibold">Total Calories</Text>
        </Pressable>
      </View>
      <View className="items-end">
        <TrendsDateRange/>
      </View>
      <CartesianChart
        data={data}
        chartPressState={state}
        xKey={period === 1 ? "week_start_date" : "meal_date"}
        yKeys={["total_calories", "total_carbohydrates"]}
        padding={15}
        domain={{y:[0, maxCalories + 100]}}
        domainPadding={{top: 30, left: 35, right: 35}}
        // 👇 pass the font, opting in to axes.
        axisOptions={{ font }}
      >
        {({ points, chartBounds }) => {
            return (
              <>
                <Bar
                  points={points.total_calories}
                  chartBounds={chartBounds}
                  animate={{ type: "timing", duration: 1000 }}
                  roundedCorners={{
                    topLeft: 10,
                    topRight: 10,
                  }}
                >
                  <LinearGradient
                    start={vec(0, 0)}
                    end={vec(0, 400)}
                    colors={["green", "#90ee9050"]}
                  />
                </Bar>

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
      <View className="flex-row justify-between p-2 mx-1">
        <View className="">
          <Text></Text>
          <Text className="text-base font-semibold">Calories under weekly goal</Text>
          <Text className="text-base font-semibold">Daily Average</Text>
        </View>
        <View className="flex-row justify-between w-20 mx-5">
          <View className="items-center px-2">
            <Text className="text-base">Avg</Text>
            <Text>{totalCalories}</Text>
            <Text>{averageCalories}</Text>
          </View>
          <View className="items-center px-2">
            <Text className="text-base">Goal</Text>
            <Text>10000</Text>
            <Text>3000</Text>
          </View>
        </View>
      </View>     
  </View>
    );
};

const styles = StyleSheet.create({
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
});

export default DailyTrendsDashboard;
