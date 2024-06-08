import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const screenWidth = Dimensions.get('window').width;

const HomeSummary = ({ calories, carbs, protein, fat }) => {
  const data = {
    labels: ["Fat", "Protein", "Carbs"], // optional
    data: [fat.consumed / fat.total, protein.consumed / protein.total, carbs.consumed / carbs.total],
    colors: ['#1E90FF', '#8A2BE2', '#FF8C00'] 
  };


  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.label}>Daily intake</Text>
        <Text style={styles.calories}>{calories.consumed} / {calories.total} cal</Text>
      </View>
      <ProgressChart
        data={data}
        width={screenWidth - 50}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={chartConfig}
        hideLegend={false}
        withCustomBarColorFromData
      />
    </View>
  );
};


const chartConfig = {
  backgroundGradientFrom: "#FFF",
  backgroundGradientTo: "#FFF",
  color: (opacity = 1) => `rgba(26, 150, 146, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

const styles = StyleSheet.create({
    container: {
      borderRadius: 10,
      padding: 4,
      backgroundColor: '#FFF',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
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

export default HomeSummary;
