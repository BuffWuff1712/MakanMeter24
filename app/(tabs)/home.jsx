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
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';

const Home = () => {
  const { selectedDate, user, mealsData, setMealsData, refresh, setRefresh } = useGlobalContext();

  const fetchMeals = async (date) => {
    const data = await getMealsForDate(user, date);
    setMealsData(data);
  };

  // Use useCallback to create a memoized version of the debounced function
  const debouncedFetchMeals = useCallback(debounce((date) => {
    fetchMeals(date);
  }, 150), [user, refresh]);

  useEffect(() => {
    debouncedFetchMeals(selectedDate);

    // Cleanup function to cancel the debounce if the component unmounts or date changes
    return () => {
      debouncedFetchMeals.cancel();
    };
  }, [selectedDate, refresh, debouncedFetchMeals]);

  const trackedMeals = [
    { 
      data: mealsData?.Breakfast?.items || [], 
      calories: mealsData?.Breakfast?.totalCalories || 0, 
      carbs: mealsData?.Breakfast?.totalCarbs || 0,
      protein: mealsData?.Breakfast?.totalProtein || 0,
      fats: mealsData?.Breakfast?.totalFats || 0,
      mealType: 'Breakfast', 
      icon: icons.breakfast
    },
    { 
      data: mealsData?.Lunch?.items || [], 
      calories: mealsData?.Lunch?.totalCalories || 0, 
      carbs: mealsData?.Lunch?.totalCarbs || 0,
      protein: mealsData?.Lunch?.totalProtein || 0,
      fats: mealsData?.Lunch?.totalFats || 0,
      mealType: 'Lunch', 
      icon: icons.lunch
    },
    { 
      data: mealsData?.Dinner?.items || [], 
      calories: mealsData?.Dinner?.totalCalories || 0, 
      carbs: mealsData?.Dinner?.totalCarbs || 0,
      protein: mealsData?.Dinner?.totalProtein || 0,
      fats: mealsData?.Dinner?.totalFats || 0,
      mealType: 'Dinner', 
      icon: icons.dinner 
    },
    { 
      data: mealsData?.Snack?.items || [], 
      calories: mealsData?.Snack?.totalCalories || 0, 
      carbs: mealsData?.Snack?.totalCarbs || 0,
      protein: mealsData?.Snack?.totalProtein || 0,
      fats: mealsData?.Snack?.totalFats || 0,
      mealType: 'Snack', 
      icon: icons.snack 
    },
  ];

  const toNotifs = () => {
    router.navigate('notifications');
  }

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Top layer icons */}
      <View className="flex-row justify-between items-center align-center mb-5 px-10">
        {/* <Image source={icons.fire} resizeMode="contain" className="w-[40px] h-[40px]" /> */}
        <FontAwesome6 name="fire" size={32} color="#FF4500" />
        <Image source={icons.logoSmall} resizeMode="contain" className="w-[55px] h-[55px]" />
        <TouchableOpacity onPress={toNotifs}>
          {/* <Image source={icons.bell} resizeMode="contain" className="w-[40px] h-[40px]" /> */}
          <Ionicons name="notifications-outline" size={34} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="w-full items-center my-5">
          <DatePicker />
        </View>
        
        <View className="w-full bg-white items-center mt-10 mb-10">
          <HomeSummary
            calories={{ consumed: mealsData?.Summary?.totalCalories || 0, total: 3046 }}
            carbs={{ consumed: mealsData?.Summary?.totalCarbs || 0, total: 381 }}
            protein={{ consumed: mealsData?.Summary?.totalProtein || 0, total: 152 }}
            fat={{ consumed: mealsData?.Summary?.totalFats || 0, total: 102 }}
          />
        </View>

        <View style={styles.mealListContainer}>
          {trackedMeals.map((item, index) => (
            <View key={index} style={styles.mealItem}>
              <MealListItem item={item} />
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
