import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { useNavigation } from 'expo-router';

const TestScreen = () => {
  const navigation = useNavigation();
  const [answers, setAnswers] = useState({ goal: '', diet: '', health: '' });

  const handleInputChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleSubmit = () => {
    navigation.navigate('RecommendationScreen', { answers });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health and Diet Test</Text>
      <TextInput
        style={styles.input}
        placeholder="What are your body goals?"
        value={answers.goal}
        onChangeText={(value) => handleInputChange('goal', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Any diet preferences?"
        value={answers.diet}
        onChangeText={(value) => handleInputChange('diet', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Current health conditions?"
        value={answers.health}
        onChangeText={(value) => handleInputChange('health', value)}
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TestScreen;
