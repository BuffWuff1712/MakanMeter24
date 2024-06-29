import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCurrentUser, submitNewTarget, updateUser } from '../../lib/supabase';
import { calculateMacronutrientNeeds } from '../../lib/calculations/calorieEstimator';


const setCaloriesScreen = () => {
  const { lowerCals, upperCals } = useLocalSearchParams();
  const { userInitData, setUserInitData } = useGlobalContext();
  const [calorieGoal, setCalorieGoal] = useState(0);

  const handleFinish = async () => {
    try {
      // Check if calorieGoal is a valid positive number
      if (calorieGoal > 0 && !isNaN(calorieGoal)) {
        // Calculate macronutrient needs based on the calorie goal
        const macroNeeds = calculateMacronutrientNeeds(calorieGoal);
  
        const user = await getCurrentUser();
        await updateUser(user, userInitData);
  
        // Submit the new caloric intake target
        await submitNewTarget(user, 'caloric_intake', calorieGoal);
  
        // Submit macronutrient needs as new targets
        await submitNewTarget(user, 'carbohydrates', macroNeeds.carbs);
        await submitNewTarget(user, 'protein', macroNeeds.protein);
        await submitNewTarget(user, 'fats', macroNeeds.fats);
  
        // Navigate to the home page
        router.navigate('/home');
      } else {
        alert('Please enter a valid number for your calorie goal.');
      }
    } catch (error) {
      console.error('Error trying to set new target for new user: ', error);
      alert('There was an error setting your new target. Please try again.');
    }
  };
  

  return (
      <SafeAreaView className='h-full justify-center p-5 bg-white'>
         <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
            <View className='items-center'>
              <Text style={styles.title}>What is your goal daily caloric intake ?</Text>
              <View className='flex-row items-center my-5'>
                <TextInput 
                    className='flex-1 flex-row border h-[50px] 
                        rounded-lg px-5 text-xl font-semibold'
                    placeholder='Enter here'
                    keyboardType='numeric' 
                    value={calorieGoal}
                    onChangeText={setCalorieGoal}
                />
              </View>
              <Text className='text-center text-base text-gray-500'>
                Based on your profile, we recommend a goal within a calorie range of {lowerCals} to {upperCals} kcal
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <CustomButton 
                title="Next"
                containerStyles="mt-7 bg-emerald"
                handlePress={handleFinish}
          />        
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default setCaloriesScreen;
