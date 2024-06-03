// DailyIntake.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import NutrientsProgressBar from './NutrientsProgressBar';

const screenWidth = Dimensions.get('window').width;

const DailyIntake = ({ calories, carbs, protein, fat }) => {
  const data = {
    labels: ["Carbs", "Protein", "Fat"], // optional
    data: [carbs.consumed / carbs.total, protein.consumed / protein.total, fat.consumed / fat.total]
  };

  const caloriesProgress = {
    color: "limegreen",
    nutrientType: "Daily Intake",
    consumed: calories.consumed,
    total: calories.total,
  };
  
  const carbsProgress = {
    color: "orange",
    nutrientType: "Carbs",
    consumed: carbs.consumed,
    total: carbs.total,
  };
  
  const proteinProgress = {
    color: "purple",
    nutrientType: "Protein",
    consumed: protein.consumed,
    total: protein.total,
  };
  
  const fatsProgress = {
    color: "blue",
    nutrientType: "Fats",
    consumed: fat.consumed,
    total: fat.total,
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.progressContainer}>
        <Text style={styles.label}>Daily intake</Text>
        <Text style={styles.calories}>{calories.consumed} / {calories.total} cal</Text>
      </View> */}
      {/* <ProgressChart
        data={data}
        width={screenWidth - 32}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
      /> */}
      <NutrientsProgressBar 
          config={caloriesProgress}/>
      <View className="flex-row justify-between mt-6">
        <NutrientsProgressBar 
          config={carbsProgress}/>
        <NutrientsProgressBar 
          config={proteinProgress}/>
        <NutrientsProgressBar 
          config={fatsProgress}/>
      </View>
    </View>
  );
};


const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  progressContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 14,
    color: '#888',
  },
});

export default DailyIntake;
