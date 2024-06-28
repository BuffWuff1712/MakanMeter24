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
import { icons } from '../../constants';
import { getDate } from '../../lib/calculations/getDate';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const Add_Food = () => {
  const { selectedDate } = useGlobalContext();
  const router = useRouter();

  const handleMealPress = (mealType) => {
    if (mealType === 'Edit Goals') {
      router.navigate('setGoals'); // Navigate to the Set Goal page
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
    'Edit Goals': icons.target, // Ensure the correct key matches the mealType
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.options}>
          {['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Edit Goals'].map((mealType) => (
            <TouchableOpacity
              key={mealType}
              style={styles.optionButton}
              activeOpacity={0.7}
              onPress={() => handleMealPress(mealType)}
            >
              <View style={styles.optionContent}>
                <Image source={mealIcons[mealType]} style={styles.icon} />
                <Text style={styles.optionText}>{mealType}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9E8',
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
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
