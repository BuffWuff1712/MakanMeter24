import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Picker } from 'react-native-wheel-pick';
import { WheelPicker } from 'react-native-ui-lib'
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';

const generateList = (min, max, platform) => {
  const list = [];

  if (platform === 'ios') {
    for (let i = min; i <= max; i ++) {
      list.push(i.toString()); // Convert to string for Picker items
    }
  } else if (platform === 'android') {
    for (let i = min; i <= max; i++) {
      list.push({ label: i.toString(), value: i });
    }
  }
  return list;
};

const AgeScreen = () => {
  const { userInitData, setUserInitData } = useGlobalContext();
  const [age, setAge] = useState('30');
  const ageListIOS= generateList(0, 140, 'ios');
  const ageListAndroid = generateList(0, 140, 'android');


  const handleFinish = () => {
    setUserInitData(prev => ({...prev, age: age}))
    router.navigate('/height'); // Replace with your next screen
  };

  

  return (
    <SafeAreaView style={styles.container}>
        <View className='items-center'>
          <Text style={styles.title}>How old are you?</Text>
          <Text className='text-center text-base text-gray-500'>We will use it to calculate your required calories and macros</Text>
          <View className='flex-row items-center'>
            {Platform.OS === 'ios' && (
              <Picker
              style={{ backgroundColor: 'white', width: 200, height: 215, }}
              selectedValue='30'
              pickerData={ageListIOS}
              onValueChange={value => { setAge(value) }}
              />
            )}
            {Platform.OS === 'android' && (
              <WheelPicker
                style={{ backgroundColor: 'white', width: 200, height: 215, }}
                items={ageListAndroid}
                initialValue={30}
                onChange={value => { setAge(value) }}
              />
            )}            
          <Text className='text-base'>years</Text>
          </View>
        </View>
        
        <CustomButton 
              title="Next"
              containerStyles="mt-7 bg-emerald"
              handlePress={handleFinish}
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
});

export default AgeScreen;
