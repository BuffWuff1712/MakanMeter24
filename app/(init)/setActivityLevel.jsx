import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import Slider from '@react-native-community/slider';
import icon from '../../constants/icons'
import { calculateCalorieNeeds } from '../../lib/calculations/calorieEstimator';


const setActivityLevelPage = () => {
  const { userInitData, setUserInitData } = useGlobalContext();
  const [activityLvl, setActivityLvl] = useState(0);
  const [readyToNavigate, setReadyToNavigate] = useState(false);

  const activityLevels = [
    { label: 'Sedentary', description: 'Little to no exercise. Mostly desk job or very minimal physical activity.', icon: icon.sedentary },
    { label: 'Lightly Active', description: 'Light exercise or sports 1-3 days a week.', icon: icon.yoga},
    { label: 'Moderately Active', description: 'Moderate exercise or sports 3-5 days a week.', icon: icon.training},
    { label: 'Highly Active', description: 'Hard exercise or sports 6-7 days a week.', icon: icon.soccer_player},
    { label: 'Extremely Active', description: 'Very hard exercise, physical jobs, or training twice a day.', icon: icon.cycling}
  ];

  useEffect(() => {
    if (readyToNavigate) {
      try {
        const recCalories = calculateCalorieNeeds(userInitData);
        router.navigate({
          pathname: '/setCalories', 
          params: {lowerCals: recCalories.calorieRangeLower, upperCals: recCalories.calorieRangeUpper }
        });
        setReadyToNavigate(false); // Reset the trigger
      } catch (error) {
        console.log("Error: ", error.message);
      }
    }
  }, [readyToNavigate, userInitData, setUserInitData]); // Depend on readyToNavigate

  const handleNext = () => {
    setReadyToNavigate(true); // Trigger the navigation in useEffect
  };

  const handleLevelChange = (value) => {
    setActivityLvl(value);
    const level = activityLevels[Math.floor(value)].label; // Ensure the value is rounded down to match an index
    setUserInitData(prev => ({...prev, activityLevel: level}));
  }

  
  return (
    <SafeAreaView style={styles.container}>
        <View className='items-center'>
          <Text style={styles.title}>How active are you?</Text>
          <Text className='text-center text-base text-gray-500'>
            We'd like to create your personalised plan with your activity in mind
          </Text>
          {/* Below Text description should change based on the value of activeLevel */}
          <View className='my-10 items-center'>
            <Image 
              source={activityLevels[activityLvl].icon} 
              style={styles.activityIcon}
            />
            <Text className='text-center text-xl font-bold'>{activityLevels[activityLvl].label}</Text>
            <Text className='text-center text-base'>{activityLevels[activityLvl].description}</Text>
          </View>
          <View className='flex-row items-center my-5'>
            <Slider
                style={{width: 300, height: 40}}
                minimumValue={0}
                maximumValue={4}
                step={1}
                onValueChange={handleLevelChange}
                minimumTrackTintColor="#10b981"
                maximumTrackTintColor="#CDCDE0"
            />
          </View>
          
        </View>
        
        <CustomButton 
              title="Next"
              containerStyles="mt-7 bg-emerald"
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  activityIcon: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
});

export default setActivityLevelPage;
