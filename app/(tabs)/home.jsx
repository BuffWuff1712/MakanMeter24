import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants';
import DatePicker from '../../components/DatePicker';
import HomeSummary from '../../components/HomeSummary';
import MealListItem from '../../components/MealListItem';
import { getMealsForDate } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { debounce } from 'lodash';

const Home = () => {
  const { selectedDate, user, mealsData, setMealsData } = useGlobalContext();

  const fetchMeals = async (date) => {
    const data = await getMealsForDate(user, date);
    console.log(data);
    setMealsData(data);
  };

  // Use useCallback to create a memoized version of the debounced function
  const debouncedFetchMeals = useCallback(debounce((date) => {
    fetchMeals(date);
  }, 150), [user]);

  useEffect(() => {
    debouncedFetchMeals(selectedDate);

    // Cleanup function to cancel the debounce if the component unmounts or date changes
    return () => {
      debouncedFetchMeals.cancel();
    };
  }, [selectedDate, debouncedFetchMeals]);

  const trackedMeals = [
    { data: mealsData?.Breakfast?.items || [], calories: mealsData?.Breakfast?.totalCalories || 0, 
      mealType: 'Breakfast', icon: icons.breakfast},
    { data: mealsData?.Lunch?.items || [], calories: mealsData?.Lunch?.totalCalories || 0, 
      mealType: 'Lunch', icon: icons.lunch},
    { data: mealsData?.Dinner?.items || [], calories: mealsData?.Dinner?.totalCalories || 0, 
      mealType: 'Dinner', icon: icons.dinner },
    { data: mealsData?.Snack?.items || [], calories: mealsData?.Snack?.totalCalories || 0, 
      mealType: 'Snack', icon: icons.snack },
  ];

  const toNotifs = () => {
    router.navigate('notifications');
  }

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Top layer icons */}
      <View className="flex flex-row justify-center items-center space-x-20 w-full bg-gray mb-5">
        <Image source={icons.fire} resizeMode="contain" className="w-[40px] h-[40px]" />
        <Image source={icons.logoSmall} resizeMode="contain" className="w-[55px] h-[55px]" />
        <TouchableOpacity onPress={toNotifs}>
          <Image source={icons.bell} resizeMode="contain" className="w-[40px] h-[40px]" />
        </TouchableOpacity>
        
      </View>

      <ScrollView>
        <View className="w-full items-center">
          <DatePicker/>
        </View>
        
        <View className="w-full bg-white items-center mt-10 mb-10">
          <HomeSummary
            calories={{ consumed: mealsData.Summary.totalCalories, total: 3046 }}
            carbs={{ consumed: mealsData.Summary.totalCarbs, total: 381 }}
            protein={{ consumed: mealsData.Summary.totalProtein, total: 152 }}
            fat={{ consumed: mealsData.Summary.totalFats, total: 102 }}
          />
        </View>


        <View style={styles.mealListContainer}>
          {trackedMeals.map((item, index) => (
            <View key={index} style={styles.mealItem}>
              <MealListItem item={item}/>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mealListContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  mealItem: {
    marginBottom: 10, // Add margin between items
  },
});

export default Home;
