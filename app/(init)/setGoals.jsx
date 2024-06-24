import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';

// import { supabase } from '../supabaseClient'; // Ensure you import your supabase client

const goalTypes = [
  { label: 'Weight', value: 'weight' },
  { label: 'Caloric Intake', value: 'caloric_intake' },
  { label: 'Nutrient Intake', value: 'nutrient_intake' },
  { label: 'Physical Activity', value: 'physical_activity' },
  { label: 'Meal Planning', value: 'meal_planning' },
  { label: 'Habit Formation', value: 'habit_formation' },
  { label: 'Health Monitoring', value: 'health_monitoring' },
];

const SetGoal = () => {
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { user } = useGlobalContext; // Assuming you have user context

  const handleSubmit = async () => {
    // const { data, error } = await supabase
    //   .from('user_goals')
    //   .insert([
    //     { user_id: user.id, goal_type: goalType, target_value: targetValue, start_date: startDate, end_date: endDate }
    //   ]);
    // if (error) console.log('Error:', error);
    // else console.log('Goal set:', data);
  };

  return (
    <SafeAreaView>
        <View style={styles.container}>
        <Text style={styles.header}>Set Your Goal</Text>
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
        <TextInput
            style={styles.input}
            placeholder="Target Value"
            onChangeText={setTargetValue}
            value={targetValue}
        />
        <TextInput
            style={styles.input}
            placeholder="Start Date (YYYY-MM-DD)"
            onChangeText={setStartDate}
            value={startDate}
        />
        <TextInput
            style={styles.input}
            placeholder="End Date (YYYY-MM-DD)"
            onChangeText={setEndDate}
            value={endDate}
        />
        <Button title="Submit" onPress={handleSubmit} />
        </View>
    </SafeAreaView>
  );
};

export default SetGoal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
