import React from 'react';
import { View, Text, StyleSheet,} from 'react-native';
import { Area, CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont, Text as SKText, LinearGradient, vec } from '@shopify/react-native-skia';
import poppins from "../assets/fonts/Poppins-SemiBold.ttf"
import { useDerivedValue } from 'react-native-reanimated';
import TrendsDateRange from './TrendsDateRange';


const WaterTrendsDashboard = ({ data }) => {
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

  const maxWaterIntake = data.length > 0 ? Math.max(...data.map(item => item.water_intake)) : 0;
  const totalWaterIntake = data.length > 0 ? data.reduce((sum, item) => sum + item.water_intake, 0) : 0;
  const averageWaterIntake = data.length > 0 ? (totalWaterIntake / data.length) : 0;


  return(
    data.length > 0 ? 
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
        {({ points, chartBounds }) => {
            return (
              <>

                <Line
                  points={points.water_intake}
                  color="sky blue"
                  strokeWidth={3}
                  animate={{ type: "timing", duration: 1000 }}
                />

                <Area
                  points={points.water_intake}
                  y0={chartBounds.bottom}
                  animate={{ type: "timing", duration: 1000 }}
                >
                  <LinearGradient
                    start={vec(chartBounds.bottom, 200)}
                    end={vec(chartBounds.bottom, chartBounds.bottom)}
                    colors={['sky blue', '#87CEEB50']}
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
                      cy={state.y.water_intake.position}
                      r={8}
                      color={"#66B2FF"}
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
        <Text style={styles.emptyText}>No water intake data available.</Text>
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

export default WaterTrendsDashboard;
