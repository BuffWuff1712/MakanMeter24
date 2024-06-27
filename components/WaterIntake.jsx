// WaterIntake.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { icons } from '../constants';
import { fetchWaterIntake, updateWaterIntake } from '../lib/supabase';
import { useGlobalContext } from '../context/GlobalProvider';
import { getDate } from '../lib/calculations/getDate';

const WaterIntake = () => {
  const { user, selectedDate, setRefresh } = useGlobalContext();
  const totalDrinks = 8; // Total number of drinks user can log
  const volumePerCup = 0.25; // Volume per cup in liters (e.g., 0.25 L per cup)
  const [activeDrink, setActiveDrink] = useState(-1); // Tracks the last active cup

  // Calculate total volume consumed
  const totalVolumeConsumed = (activeDrink + 1) * volumePerCup;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVolume = await fetchWaterIntake(user, getDate(selectedDate));
        const fetchedActiveDrink = Math.floor(fetchedVolume / volumePerCup) - 1;
        setActiveDrink(fetchedActiveDrink); // Update activeDrink state based on fetched volume
      } catch (error) {
        console.error('Error fetching water intake data: ', error);
      }
    };

    fetchData();
  }, [selectedDate, user]); // Fetch data whenever the selectedDate or user changes

  const handleDrinkPress = async (index) => {
    try {
      const newTotalVolumeConsumed = (index + 1) * volumePerCup;
      setActiveDrink(index);
      await updateWaterIntake(user, getDate(selectedDate), newTotalVolumeConsumed);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error updating water intake: ', error);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.flexRowBetween}>
        <Text style={styles.textXLFontSemibold}>
          Water Intake
        </Text>
        <Text style={styles.textLGFontSemibold}>
          {totalVolumeConsumed.toFixed(2)} / 2.00 L
        </Text>
      </View>
      <View style={styles.flexRowCenter}>
        {[...Array(totalDrinks)].map((_, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => handleDrinkPress(index)}>
            <Image 
              source={icons.drink} 
              style={[
                styles.icon,
                { opacity: index <= activeDrink ? 1 : 0.3 } // Conditional styling based on the active drink
              ]}/>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    height: 150,
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  textXLFontSemibold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textLGFontSemibold: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flexRowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexRowCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 50,
    width: 39,
    marginHorizontal: 2, // Add space between icons
  }
});

export default WaterIntake;
