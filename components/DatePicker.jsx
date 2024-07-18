import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { icons } from '../constants';
import { useGlobalContext } from '../context/GlobalProvider';

const DatePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { selectedDate, setSelectedDate } = useGlobalContext();

  const handlePreviousDay = () => {
    setSelectedDate(new Date(selectedDate.getTime() - 86400000)); // Subtract 1 day
  };

  const handleNextDay = () => {
    setSelectedDate(new Date(selectedDate.getTime() + 86400000)); // Add 1 day
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  const parts = selectedDate.toDateString().split(' ');
  const formattedDate = `${parts[0]}, ${parts[1]} ${parts[2]}`;

  return (
    <View style={styles.container}>
      <TouchableOpacity testID='previousDay' onPress={handlePreviousDay}>
        <Image 
          source={icons.back} 
          resizeMode='contain'
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity testID='formattedDate' onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>     
      <TouchableOpacity testID='nextDay' onPress={handleNextDay}>
        <Image 
          source={icons.forward} 
          resizeMode='contain'
          style={styles.icon}
        />
      </TouchableOpacity>
      
      <Modal
        transparent={true}
        animationType="slide"
        visible={showDatePicker}
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.pickerContainer}>
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="inline"
              onChange={handleDateChange}
              style={styles.picker}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '89%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600'
  },
  icon: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  picker: {
    width: 300,
    backgroundColor: 'transparent',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default DatePicker;
