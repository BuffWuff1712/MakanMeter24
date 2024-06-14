import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getDate } from '../../lib/supabase';
import { icons } from '../../constants';

const { width, height } = Dimensions.get('window');

const Add_Food = () => {
  const { selectedDate } = useGlobalContext();
  const router = useRouter();

  const handleMealPress = (mealType) => {
    if (mealType === 'Set Goal') {
      // router.navigate('set_goal_page'); // Navigate to the Set Goal page
      Alert.alert("Navigate to Set Goal page");
    } else {
      router.navigate({
        pathname: 'log_page',
        params: { meal_type: mealType, date: getDate(selectedDate) },
      });
    }
  };

  // Mapping of meal types to their corresponding icons
  const mealIcons = {
    Breakfast: icons.breakfast,
    Lunch: icons.lunch,
    Dinner: icons.dinner,
    Snack: icons.snack,
    'Set Goal': icons.target, // Ensure the correct key matches the mealType
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.options}>
          {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Set Goal'].map((mealType) => (
            <Pressable
              key={mealType}
              style={styles.optionButton}
              onPress={() => handleMealPress(mealType)}
            >
              <View style={styles.optionContent}>
                <Image source={mealIcons[mealType]} style={styles.icon} />
                <Text style={styles.optionText}>{mealType}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#d1d5db',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2,
    width: width * 0.4, // Adjust width to ensure buttons are not too wide
    height: height * 0.2, // Adjust height to ensure buttons are not too tall
    justifyContent: 'center', // Center the text within the button
    alignItems: 'center', // Center the text within the button
  },
  optionContent: {
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  optionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Add_Food;
