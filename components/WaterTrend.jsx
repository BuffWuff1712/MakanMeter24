import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Bar, CartesianChart, Line, Pie, PolarChart, useChartPressState } from 'victory-native';
import { Circle, useFont, vec, LinearGradient, Text as SKText } from '@shopify/react-native-skia';
import poppins from "../assets/fonts/Poppins-SemiBold.ttf"
import { useDerivedValue } from 'react-native-reanimated';
import TrendsDateRange from './TrendsDateRange';
import { useGlobalContext } from '../context/GlobalProvider';


const WaterTrendsDashboard = ({data, onPress }) => {
  const { period } = useGlobalContext();
  const font = useFont(poppins, 12);
  const toolTipFont = useFont(poppins, 14);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { water_intake: 0 },
  });

  const value = useDerivedValue(() => {
    return state.y.water_intake.value.value + " L";
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.water_intake.position.value - 15;
  }, [value]);

  const textXPosition = useDerivedValue(() => {
    if (!toolTipFont) {
      return 0;
    }
    return (
      state.x.position.value - toolTipFont.measureText(value.value).width / 2
    );
  }, [value, toolTipFont]);

  const maxWaterIntake = Math.max(...data.map(item => item.water_intake));
  const totalWaterIntake = data.reduce((sum, item) => sum + item.water_intake, 0);
  const averageWaterIntake = totalWaterIntake / data.length;


  return (
    <View style={styles.container}>
      <View className="my-2 mx-3">
        <Text className="text-2xl font-semibold">Water Intake</Text>
      </View>
      <View className="my-2 mx-3">
        <Text className="text-xl color-gray-500">
            Average per day: <Text className="text-xl color-black font-semibold">{averageWaterIntake.toFixed(2)} L</Text>
        </Text>
        <Text className="text-xl color-gray-500">
            Goal: <Text className="text-xl color-sky font-semibold">2.00 L</Text>
        </Text>
      </View>
      <View className="items-end">
        <TrendsDateRange/>
      </View>
      <CartesianChart
        data={data}
        chartPressState={state}
        xKey={"record_date"}
        yKeys={["water_intake"]}
        padding={15}
        domain={{y:[0, maxWaterIntake + 0.5]}}
        domainPadding={{top: 30, left: 30, right: 30}}
        // 👇 pass the font, opting in to axes.
        axisOptions={{ font }}
      >
        {({ points }) => {
            return (
              <>

                <Line
                  points={points.water_intake}
                  color="sky blue"
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
                      cy={state.y.water_intake.position}
                      r={8}
                      color={"sky blue"}
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

export default WaterTrendsDashboard;
