import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Picker } from 'react-native-wheel-pick';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import { WheelPicker } from 'react-native-ui-lib';

const generateList = (min, max, platform) => {
  const list = [];

  if (platform === 'ios') {
    for (let i = min; i <= max; i++) {
      list.push(i.toString()); // Convert to string for Picker items
    }
  } else if (platform === 'android') {
    for (let i = min; i <= max; i++) {
      list.push({ label: i.toString(), value: i });
    }
  }
  return list;
};

const HeightScreen = () => {
  const { userInitData, setUserInitData } = useGlobalContext();
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('cm');
  const heightCMIOS = generateList(20, 300, 'ios');
  const heightCMAndroid = generateList(20, 300, 'android');

  const handleFinish = () => {
    setUserInitData(prev => ({...prev, height: height}));
    router.navigate('/weight'); // Replace with your next screen
  };

  

  return (
    <SafeAreaView style={styles.container}>
        <View className='items-center'>
          <Text style={styles.title}>How tall are you?</Text>
          <Text className='text-center text-base text-gray-500'>We will use it to calculate your required calories and macros</Text>
          <View className='flex-row items-center'>
            {Platform.OS === 'ios' && (
              <Picker
                style={{ backgroundColor: 'white', width: 200, height: 215, }}
                selectedValue='170'
                pickerData={heightCMIOS}
                onValueChange={value => { setHeight(value) }}
              />
            )}

            {Platform.OS === 'android' && (
              <WheelPicker
                style={{ backgroundColor: 'white', width: 200, height: 215, }}
                initialValue={170}
                items={heightCMAndroid}
                onChange={value => { setHeight(value) }}
              />
            )}
            
            <Text className='text-base'>cm</Text>
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

export default HeightScreen;
