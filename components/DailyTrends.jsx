import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Bar, CartesianChart, Line, Pie, PolarChart, useChartPressState } from 'victory-native';
import { Dimensions } from 'react-native';
import { Circle, useFont, vec, LinearGradient, Text as SKText } from '@shopify/react-native-skia';
import poppins from "../assets/fonts/Poppins-SemiBold.ttf"
import { useDerivedValue } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;



const DailyTrendsDashboard = ({ data }) => {

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


  return (
    <View style={styles.container}>
      <View className="items-center">
        <Text className="text-xl font-semibold">Total Calories</Text>
      </View>
      <CartesianChart
        data={data}
        chartPressState={state}
        xKey="meal_date"
        yKeys={["total_calories", "total_carbohydrates"]}
        padding={15}
        domain={{y:[0, 3000]}}
        domainPadding={{top: 30, left: 30, right: 30}}
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

                <Line
                  points={points.total_calories}
                  color="red"
                  strokeWidth={3}
                  animate={{ type: "timing", duration: 1000 }}
                />

                <Line
                  points={points.total_carbohydrates}
                  color="blue"
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
    );
};

const styles = StyleSheet.create({
  container: {
    height: "80%", 
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
