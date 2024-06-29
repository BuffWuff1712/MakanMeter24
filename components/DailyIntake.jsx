import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import NutrientsProgressBar from './NutrientsProgressBar';


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

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
});

export default DailyIntake;
