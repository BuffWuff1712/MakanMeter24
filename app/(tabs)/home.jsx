import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { supabase } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import { icons } from '../../constants';
import DatePicker from '../../components/DatePicker';
import HomeSummary from '../../components/HomeSummary';
import MealListItem from '../../components/MealListItem';
import { fetchGoal, fetchMacroGoals, fetchStreak, getMealsForDate } from '../../lib/supabase';
import { router } from 'expo-router';
import { debounce } from 'lodash';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import WaterIntake from '../../components/WaterIntake';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

const Home = () => {
  const { selectedDate, user, mealsData, setMealsData,
    macroGoals, setMacroGoals, calorieGoals, setCalorieGoals, streak, setStreak, 
    lastLoggedDate, setLastLoggedDate, refresh } = useGlobalContext();

  const [hasLoggedMealToday, setHasLoggedMealToday] = useState(false);
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        await supabase
          .from('users')
          .update({
            expo_push_token: token,
          })
          .eq('user_id', user);
      })
      .catch((error) => console.log(error));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [user]);

  const fetchMeals = async (date) => {
    try {
      const data = await getMealsForDate(user, date);
      const tempCalorieGoal = await fetchGoal(user, 'caloric_intake');
      const tempMacroGoals = await fetchMacroGoals(user);

      setCalorieGoals(tempCalorieGoal);
      setMacroGoals(tempMacroGoals);
      setMealsData(data);
    } catch (error) {
      console.log(error);
    }
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

  // Fetch streak data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStreak(user); 
        setStreak(data.current_streak);
        setLastLoggedDate(new Date(data.last_logged_date));

        // Check if the last logged date is today or in the future
        const today = new Date();
        const lastLogged = new Date(data.last_logged_date);
        setHasLoggedMealToday(lastLogged >= new Date(today.getFullYear(), today.getMonth(), today.getDate()));

      } catch (error) {
        console.log('Error in fetching streak: ', error.message);
        setLastLoggedDate(new Date());
      }
    };

    fetchData();
  }, [refresh, user]);

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
  };

  return (
    <SafeAreaView className="bg-white h-full">
      {/* Top layer icons */}
      <View className="flex-row justify-between items-center align-center mb-5 px-10">
        <View className='flex-row align-center items-center'>
          <FontAwesome6 name="fire" size={32} color={hasLoggedMealToday ? "#FF4500" : "#C0C0C0"} />
          <Text 
            className='text-base font-bold' 
            style={{ 
              color: hasLoggedMealToday ? "#FF4500" : "#C0C0C0",
              width: 50,
              textAlign: 'center'
              }}>{streak}</Text>
        </View>
        <Image source={icons.logoSmall} resizeMode="contain" className="w-[55px] h-[55px]" />
        <TouchableOpacity onPress={toNotifs} className='pl-12'>
          <Ionicons name="notifications-outline" size={34} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View className="w-full items-center my-5">
          <DatePicker />
        </View>
        
        <View className="w-full bg-white items-center mt-10 mb-10">
          <HomeSummary
            calories={{ consumed: mealsData?.Summary?.totalCalories || 0, total: calorieGoals }}
            carbs={{ consumed: mealsData?.Summary?.totalCarbs || 0, total: macroGoals?.carbohydrates || 0}}
            protein={{ consumed: mealsData?.Summary?.totalProtein || 0, total: macroGoals?.protein || 0}}
            fat={{ consumed: mealsData?.Summary?.totalFats || 0, total: macroGoals?.fats || 0}}
          />
        </View>

        <View style={styles.mealListContainer}>
          {trackedMeals.map((item, index) => (
            <View key={index} style={styles.mealItem}>
              <MealListItem item={item} />
            </View>
          ))}
        </View>

        <View className='px-2'>
          <WaterIntake />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeScreen: {
    backgroundColor: '#FFF9E8',
  },
  mealListContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  mealItem: {
    marginBottom: 10, // Add margin between items
  },
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
  icon: {
    height: 50,
    width: 42,
    marginHorizontal: 2, // Add space between icons
  }
});

export default Home;
