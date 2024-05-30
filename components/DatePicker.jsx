import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '../constants';

const DatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handlePreviousDay = () => {
    setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() - 1)));
  };

  const handleNextDay = () => {
    setDate(prevDate => new Date(prevDate.setDate(prevDate.getDate() + 1)));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const parts = date.toDateString().split(' ');
  const formattedDate = `${parts[0]}, ${parts[1]} ${parts[2]}`; 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePreviousDay}>
        <Image 
          source={icons.back} 
          resizeMode='contain'
          className="w-[30px] h-[30px]"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNextDay}>
        <Image 
            source={icons.forward} 
            resizeMode='contain'
            className="w-[30px] h-[30px]"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '87%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 18,
  },
});

export default DatePicker;
