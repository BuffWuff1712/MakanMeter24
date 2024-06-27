import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from 'expo-router';

const RecommendationScreen = () => {
  const route = useRoute();
  const { answers } = route.params;

  const getRecommendations = (answers) => {
    // Replace this with your actual recommendation logic
    return 'Based on your answers, we recommend a balanced diet with regular exercise.';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommendations</Text>
      <Text>{getRecommendations(answers)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default RecommendationScreen;
