import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';
import { Area, CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont, Text as SKText, LinearGradient, vec } from '@shopify/react-native-skia';
import poppins from "../assets/fonts/Poppins-SemiBold.ttf"
import { useDerivedValue } from 'react-native-reanimated';
import TrendsDateRange from './TrendsDateRange';

const WeightTrendsDashboard = ({ data, goal }) => {
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

  const maxWeight = data.length > 0 ? Math.max(...data.map(item => item.weight)) : 0;

  return (
    data.length > 0 ?  
    <View style={styles.container}>
      <View className="my-2 mx-3">
        <Text className="text-2xl font-semibold">Weight Progress</Text>
      </View>
      <View className="my-2 mx-3">
        <Text className="text-xl color-gray-500">
          Current Weight: <Text className="text-xl color-black font-semibold">{data.at(-1).weight.toFixed(1)} kg</Text>
        </Text>
        <Text className="text-xl color-gray-500">
          Goal: <Text className="text-xl color-emerald font-semibold">
                  {goal.length > 0 ? `${goal[0].target_value.toFixed(1)} kg` : 'No goal set'}
                </Text>
        </Text>
      </View>
      <View className="items-end">
        <TrendsDateRange />
      </View>
      <CartesianChart
        data={data}
        chartPressState={state}
        xKey={"record_date"}
        yKeys={["weight"]}
        padding={15}
        domain={{ y: [0, maxWeight + 30] }}
        domainPadding={{ top: 30, left: 30, right: 30 }}
        axisOptions={{ font }}
      >
        {({ points, chartBounds }) => {
          return (
            <>
              <Line
                points={points.weight}
                color="#50C878"
                strokeWidth={3}
                animate={{ type: "timing", duration: 1000 }}
              />
              <Area
                  points={points.weight}
                  y0={chartBounds.bottom}
                  animate={{ type: "timing", duration: 1000 }}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, 200)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={['#50C878', '#50C87850']}
                  />
              </Area>
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
                    color={"green"}
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
      <Text style={styles.emptyText}>No weight data available.</Text>
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
    fontSize: 18,
    color: 'gray',
  },
});

export default WeightTrendsDashboard;
