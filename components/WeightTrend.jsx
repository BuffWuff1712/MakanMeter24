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


const data = [];

const WeightTrendsDashboard = ({data, onPress }) => {
  const { period } = useGlobalContext();
  const font = useFont(poppins, 12);
  const toolTipFont = useFont(poppins, 14);
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { weight: 0 },
  });

  const value = useDerivedValue(() => {
    return state.y.weight.value.value + " kg";
  }, [state]);

  const textYPosition = useDerivedValue(() => {
    return state.y.weight.position.value - 15;
  }, [value]);

  const textXPosition = useDerivedValue(() => {
    if (!toolTipFont) {
      return 0;
    }
    return (
      state.x.position.value - toolTipFont.measureText(value.value).width / 2
    );
  }, [value, toolTipFont]);

  const maxWeight = Math.max(...data.map(item => item.weight));

  return (
    <View style={styles.container}>
      <View className="my-2 mx-3">
        <Text className="text-2xl font-semibold">Weight Progress</Text>
      </View>
      <View className="my-2 mx-3">
        <Text className="text-xl color-gray-500">
            Current Weight: <Text className="text-xl color-black font-semibold">{data.at(-1).weight.toFixed(1)} kg</Text>
        </Text>
        <Text className="text-xl color-gray-500">
            Goal: <Text className="text-xl color-emerald font-semibold">50.0 kg</Text>
        </Text>
      </View>
      <View className="items-end">
        <TrendsDateRange/>
      </View>
      <CartesianChart
        data={data}
        chartPressState={state}
        xKey={"record_date"}
        yKeys={["weight"]}
        padding={15}
        domain={{y:[0, maxWeight + 30]}}
        domainPadding={{top: 30, left: 30, right: 30}}
        // 👇 pass the font, opting in to axes.
        axisOptions={{ font }}
      >
        {({ points }) => {
            return (
              <>

                <Line
                  points={points.weight}
                  color="red"
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
                      cy={state.y.weight.position}
                      r={8}
                      color={"red"}
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

export default WeightTrendsDashboard;
