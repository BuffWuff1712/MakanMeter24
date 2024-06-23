import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FoodListItem from '../../components/FoodListItem';
import CustomButton from '../../components/CustomButton';
const { fetchNutritionInfoForIngredients } = require('../../lib/edamam.js');
import { addMeal, getMealsForDate, getTrackedMeals, } from '../../lib/supabase.js';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import LoadingScreen from '../../components/LoadingScreen.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const Results = () => {
  const { meal_type } = useLocalSearchParams();
  const { user, setTrackedMeals, setMealsData, selectedDate,} = useGlobalContext();
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingContext, setLoadingContext] = useState('analyzing'); // New state variable
  const [error, setError] = useState(null);
  const { data } = useLocalSearchParams();

  // FOR DUMMY API REQUEST- contains DUMMY FOOD INFO
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = JSON.parse(data);
        const ingredients = jsonData.ingredients;
        const foodItemsArray = [
          { "nf_calories": 384, "food_name": "Noodle", "nf_total_carbohydrate": 71.3, "nf_total_fat": 4.44, "nf_dietary_fiber": 3.3, "nf_protein": 14.2 },
          { "nf_calories": 71, "food_name": "Shrimp", "nf_total_carbohydrate": 0.91, "nf_total_fat": 1.01, "nf_dietary_fiber": 0, "nf_protein": 13.6 },
          { "nf_calories": 92, "food_name": "Squid", "nf_total_carbohydrate": 3.08, "nf_total_fat": 1.38, "nf_dietary_fiber": 0, "nf_protein": 15.6 },
          { "nf_calories": 32, "food_name": "Green Onion", "nf_total_carbohydrate": 7.34, "nf_total_fat": 0.19, "nf_dietary_fiber": 2.6, "nf_protein": 1.83 },
          { "nf_calories": 30, "food_name": "Bean Sprout", "nf_total_carbohydrate": 5.94, "nf_total_fat": 0.18, "nf_dietary_fiber": 1.8, "nf_protein": 3.04 },
          { "nf_calories": 30, "food_name": "Lime", "nf_total_carbohydrate": 10.5, "nf_total_fat": 0.2, "nf_dietary_fiber": 2.8, "nf_protein": 0.7 },
          { "nf_calories": 40, "food_name": "Chili", "nf_total_carbohydrate": 8.81, "nf_total_fat": 0.44, "nf_dietary_fiber": 1.5, "nf_protein": 1.87 },
          { "nf_calories": 149, "food_name": "Garlic", "nf_total_carbohydrate": 33.1, "nf_total_fat": 0.5, "nf_dietary_fiber": 2.1, "nf_protein": 6.36 },
          { "nf_calories": 53, "food_name": "Soy Sauce", "nf_total_carbohydrate": 4.93, "nf_total_fat": 0.57, "nf_dietary_fiber": 0.8, "nf_protein": 8.14 },
          { "nf_calories": 884, "food_name": "Oil", "nf_total_carbohydrate": 0, "nf_total_fat": 100, "nf_dietary_fiber": 0, "nf_protein": 0 }
        ];        
        setFoodItems(foodItemsArray);
      } catch (error) {
        console.error('Error fetching nutrition info:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data]);

  const handleSelectItem = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item)) {
        return prevSelectedItems.filter((i) => i !== item);
      } else {
        return [...prevSelectedItems, item];
      }
    });
  };

  const handleAddButtonPress = async () => {
    if (selectedItems.length > 0) {
      setIsLoading(true);
      setLoadingContext('adding');
      try {
        console.log('Required JSON data: ',selectedItems);
        const meal_id = await addMeal(selectedItems, meal_type, selectedDate);
        const updatedTrackedMeals = await getTrackedMeals(meal_id);
        const mealsData = await getMealsForDate(user, selectedDate);
        setTrackedMeals(updatedTrackedMeals);
        setMealsData(mealsData);

        router.navigate({
          pathname: 'log_page',
          params: { meal_type }, // Pass the tracked meals data
        });
      } catch (error) {
        console.error('Error adding meal:', error);
        Alert.alert('Error', 'Failed to add meal. Please try again.');
      } finally {
        setIsLoading(true);
      }
    } else {
      Alert.alert('No items selected', 'Please select at least one item to add.');
    }
  };

  const goBack = () => {
    router.back();
  };

  const renderLoadingScreen = () => {
    return (
      <View style={styles.loadingContainer}>
        {loadingContext === 'analyzing' ? (
          <LoadingScreen text={'Analysing Ingredients'}/>
        ) : (
          <LoadingScreen text={'Adding Ingredients'}/>
        )}
      </View>
    );
  };

  const searchForMoreButton = () => {
    return (
      <View className="mt-3 items-center">
        <View className="w-[200px]">
        <Button 
          mode="outlined"
          icon={() => <FontAwesome name="search" size={15} color="#1434A4" />}
          compact={true} 
          contentStyle={{flexDirection: 'row'}}
          labelStyle={{color:"#1434A4"}}
          onPress={() => console.log('Pressed')}
        >
          Search For More     
        </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.flexContainer}>
      {isLoading ? (
        renderLoadingScreen()
      ) : (
        <SafeAreaView className="bg-white h-full">
          <View className="flex-1 p-4 bg-white">
            <View className="my-5 mx-3 items-center justify-between flex-row">
              <TouchableOpacity onPress={goBack}>
                <FontAwesome5 name="arrow-left" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-xl font-semibold">Scan a Meal</Text>
              <View></View>
            </View>
          <FlatList
            data={foodItems}
            renderItem={({ item }) => <FoodListItem item={item} onSelect={handleSelectItem} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 5 }}
            className="my-5"
            ListFooterComponent={searchForMoreButton}
          />
          <View style={styles.buttonContainer}>
            <CustomButton
              title={selectedItems.length > 0 ? `ADD (${selectedItems.length} items)`:"ADD"}
              containerStyles={selectedItems.length > 0 ? "bg-emerald" : "bg-gray-100"}
              handlePress={handleAddButtonPress}
            />
          </View>
          </View>
        </SafeAreaView>
        
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#000',
  },
});

export default Results;
