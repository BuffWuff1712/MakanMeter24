import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import CustomButton from '../../components/CustomButton';

const GenderScreen = () => {
  const { userInitData, setUserInitData } = useGlobalContext();
  const [gender, setGender] = useState('');

  const handleNext = () => {
    if (gender === '') {
      Alert.alert("Error", "Please select an option");
      return;
    }

    setUserInitData(prev => ({...prev, gender: gender}))
    router.navigate('/age'); // Navigate to the AgeScreen
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What's your gender?</Text>
      <Text style={styles.subtitle}>
        To create your personalized plan, we need to take your age into account.
      </Text>
      <View style={styles.pickerContainer}>
        <TouchableOpacity style={styles.option} onPress={() => setGender('female')}>
          <Text style={styles.optionText}>👩 Female</Text>
          <View style={gender === 'female' ? styles.selectedCircle : styles.circle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setGender('male')}>
          <Text style={styles.optionText}>👨 Male</Text>
          <View style={gender === 'male' ? styles.selectedCircle : styles.circle} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => setGender('default')}>
          <Text style={styles.optionText}>Prefer not to say</Text>
          <View style={gender === 'default' ? styles.selectedCircle : styles.circle} />
        </TouchableOpacity>
      </View>
      <CustomButton 
          title="Next"
          containerStyles="bg-emerald"
          handlePress={handleNext}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  progressBar: {
    height: 5,
    backgroundColor: '#4caf50',
    width: '50%',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  pickerContainer: {
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#10b981',
    backgroundColor: '#10b981',
  },
  button: {
    backgroundColor: '#10b981',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GenderScreen;
