import React, { useEffect, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { View, Text, TextInput, Button, StyleSheet, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import { fetchGoal, submitNewTarget } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDate } from '../../lib/calculations/getDate';


const goalTypes = [
  { label: 'Weight', value: 'weight' },
  { label: 'Caloric Intake', value: 'caloric_intake' },
];

const SetGoal = () => {
  const [goalType, setGoalType] = useState('');
  const [goalValue, setGoalValue] = useState(0);
  const [targetValue, setTargetValue] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);


  const { user } = useGlobalContext(); // Assuming you have user context
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchGoal(user, goalType);
        if (result[0]) {
          setGoalValue(result[0].target_value);
        } else {
          setGoalValue(0);
        }
      } catch (error) {
        console.error('Error fetching goal: ', error);
      }
    }

    fetchData();
  }, [goalType]);

  const handleSubmit = async () => {
    // Validate input
    if (!targetValue) {
      Alert.alert('Validation Error', 'Please input a new target.');
      return;
    }
    if (startDate >= endDate) {
      Alert.alert('Validation Error', 'Start date must be before end date.');
      return;
    }

    try {
      Keyboard.dismiss();
      await submitNewTarget(user, goalType, targetValue, startDate, endDate);
      setTargetValue('');
      Alert.alert('Changes Submitted!');
    } catch (error) {
      console.error('Error submitting new targets: ', error);
    }
  };

  const goBack = () => {
    router.back();
  };

  const toggleStartPicker = () => {
    setShowStartPicker(!showStartPicker);
    setShowEndPicker(false);
  }

  const toggleEndPicker = () => {
    setShowEndPicker(!showEndPicker);
    setShowStartPicker(false);
  }

  const renderGoalInput = () => {
    switch (goalType) {
      case 'weight':
        return (
          <View style={styles.value}>
              <Text className='flex-1 text-xl font-semibold'>Current Goal: </Text>
              <Text className='flex-1 text-xl font-semibold text-right'>{goalValue} Kg</Text>
          </View>
          
        );
      case 'caloric_intake':
        return (
          <View style={styles.value}>
              <Text className='flex-1 text-xl font-semibold'>Current Goal: </Text>
              <Text className='flex-1 text-xl font-semibold text-right'>{goalValue} kcal</Text>
          </View>
        );
      case 'nutrient_intake':
        return (
          <View style={styles.value}>
              <Text className='flex-1 text-xl font-semibold'>Current Goal: </Text>
              <Text className='flex-1 text-xl font-semibold text-right'>{goalValue} Kg</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const renderTargetInput = () => {
    switch (goalType) {
      case 'weight':
        return (
          <View style={styles.target}>
            <Text className='flex-1 text-xl font-semibold'>New Target (Kg): </Text>
            <TextInput
              style={styles.targetInput}
              placeholder="Enter weight"
              onChangeText={setTargetValue}
              value={targetValue}
            />
          </View>
        );
      case 'caloric_intake':
        return (
          <View style={styles.target}>
            <Text className='flex-1 text-xl font-semibold'>New Target (kcal): </Text>
            <TextInput
              style={styles.targetInput}
              placeholder="Enter calories"
              onChangeText={setTargetValue}
              value={targetValue}
            />
          </View>
        );
      case 'nutrient_intake':
        return (
          <View style={styles.target}>
            <Text className='flex-1 text-xl font-semibold'>Specific Nutrient Intake (e.g., Protein in grams): </Text>
            <TextInput
              style={styles.targetInput}
              placeholder="Enter nutrient amount"
              onChangeText={setTargetValue}
              value={targetValue}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className='h-full bg-white'>
      <View style={styles.container}>
        <View className='w-full flex-row justify-evenly space-x-14 items-center mb-5'>
          <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text className='text-3xl font-semibold'>Set Your Goal</Text>
          <Text></Text>
        </View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={goalTypes}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Goal Type"
          value={goalType}
          onChange={item => {
            setGoalType(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign style={styles.icon} color="black" name="flag" size={20} />
          )}
        />
        
        {goalType && (
          <View>
            <View className='mb-5'> 
              {renderGoalInput()}
              {renderTargetInput()}
              <View style={styles.target}> 
                  <Text className='flex-1 text-xl font-semibold'>Start Date: </Text>
                  <View>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={toggleStartPicker}
                      >
                      <View pointerEvents="box-only">
                        <TextInput
                        style={styles.input}
                        value={getDate(startDate)}
                        editable={false}
                        />
                      </View>
                    </TouchableOpacity>         
                  </View>
              </View>
              <View style={styles.target}> 
                  <Text className='flex-1 text-xl font-semibold'>End Date: </Text>
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={toggleEndPicker}
                    >
                      <View pointerEvents="box-only">
                        <TextInput
                        style={styles.input}
                        value={getDate(endDate)}
                        editable={false}
                        />
                      </View>
                    </TouchableOpacity>         
                  </View>
              </View>
            </View>

            <CustomButton 
              title="Submit Changes" 
              containerStyles={'bg-emerald'} 
              handlePress={handleSubmit} 
            />
            
            {showStartPicker && (
              <DateTimePicker 
                value={startDate}
                onChange={(event, date) => {setStartDate(date); setShowStartPicker(false);}}
                mode="date"
                display="inline"
                style={styles.startDatePicker}
              />
            )}
            {showEndPicker && (
              <DateTimePicker 
                value={endDate}
                onChange={(event, date) => {setEndDate(date); setShowEndPicker(false);}}
                mode="date"
                display="inline"
                style={styles.endDatePicker}
              />
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SetGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  dropdown: {
    marginBottom: 16,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems:'center', 
  },
  target: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginVertical: 10,
    alignItems:'center', 
  },
  input: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  targetInput: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  startDatePicker: {
    position: 'absolute',
    top: 180,
    right: 2,
    width: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor:'white',
  },
  endDatePicker: {
    position: 'absolute',
    top: 250,
    right: 2,
    width: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor:'white',
  },
});
