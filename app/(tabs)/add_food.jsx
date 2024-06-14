import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
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
    router.navigate({
      pathname: 'log_page',
      params: { meal_type: mealType, date: getDate(selectedDate) },
    });
  };

  // Mapping of meal types to their corresponding icons
  const mealIcons = {
    Breakfast: icons.breakfast,
    Lunch: icons.lunch,
    Dinner: icons.dinner,
    Snack: icons.snack,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.options}>
          {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((mealType) => (
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
    backgroundColor: 'gray',
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
