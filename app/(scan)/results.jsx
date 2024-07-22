import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FoodListItem from '../../components/FoodListItem';
import CustomButton from '../../components/CustomButton';
const { fetchNutritionInfoForDishes } = require('../../lib/nutritionix.js');
import { addMeal, getMealsForDate, getTrackedMeals, } from '../../lib/supabase.js';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import LoadingScreen from '../../components/LoadingScreen.jsx';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Button } from 'react-native-paper';

const Results = () => {
  const { meal_type } = useLocalSearchParams();
  const { user, setTrackedMeals, setMealsData, selectedDate, setRefresh, lastLoggedDate} = useGlobalContext();
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingContext, setLoadingContext] = useState('analyzing'); // New state variable
  const { data } = useLocalSearchParams();

  // // DO NOT USE UNTIL APP HAS BEEN FINALISED - REQUEST TO FOOD DATABASE API
  useEffect(() => {
    // Function to fetch data of the food items from the Foodbase API
    const fetchData = async () => {
      try {
        const jsonData = JSON.parse(data);

        if (jsonData.possible_dish_names) {
          // Case 1: jsonData contains 'possible_dish_names'
          const dishes = jsonData.possible_dish_names;
          const foodItemsArray = await fetchNutritionInfoForDishes(dishes);
          setFoodItems(foodItemsArray);
        } else {
          // Case 2: jsonData is already in the desired format
          setFoodItems([jsonData]);
        }
      } catch (error) {
        console.log('Error fetching nutrition info:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [data]);

  // // FOR DUMMY API REQUEST- contains DUMMY FOOD INFO
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const jsonData = JSON.parse(data);

  //       if (jsonData.possible_dish_names) {
  //         const foodItemsArray = [
  //           { nf_calories: 71, food_name: 'Noodle', nf_total_carbohydrate: 0.91, nf_total_fat: 1.01, nf_dietary_fiber: 0, nf_protein: 13.6, saturated_fat: 6.97, polyunsaturated_fat: 8.01, monounsaturated_fat: 3.19, cholesterol: 66.19, sodium: 2205.28, potassium: 1629.53, sugars: 35.02, vitamin_a: 179.83, vitamin_c: 65.1, vitamin_d: 1.85, calcium: 222.63, iron: 17.54, zinc: 4.54, vitamin_b12: 0.74, magnesium: 199.06, serving_qty: 1 },
  //           { nf_calories: 92, food_name: 'Shrimp', nf_total_carbohydrate: 3.08, nf_total_fat: 1.38, nf_dietary_fiber: 0, nf_protein: 15.6, saturated_fat: 1.48, polyunsaturated_fat: 9.47, monounsaturated_fat: 5.76, cholesterol: 263.79, sodium: 185, potassium: 3119.08, sugars: 12.12, vitamin_a: 183.93, vitamin_c: 26.84, vitamin_d: 8.68, calcium: 834.85, iron: 6, zinc: 8.17, vitamin_b12: 0.33, magnesium: 394.32, serving_qty: 1 },
  //           { nf_calories: 32, food_name: 'Squid', nf_total_carbohydrate: 7.34, nf_total_fat: 0.19, nf_dietary_fiber: 2.6, nf_protein: 1.83, saturated_fat: 3.51, polyunsaturated_fat: 0.24, monounsaturated_fat: 7.94, cholesterol: 165.51, sodium: 41.24, potassium: 3746.35, sugars: 21.14, vitamin_a: 364.12, vitamin_c: 52.88, vitamin_d: 1.94, calcium: 473.22, iron: 17.08, zinc: 7.4, vitamin_b12: 1.67, magnesium: 40.18, serving_qty: 1 },
  //           { nf_calories: 30, food_name: 'Green Onion', nf_total_carbohydrate: 5.94, nf_total_fat: 0.18, nf_dietary_fiber: 1.8, nf_protein: 3.04, saturated_fat: 4.65, polyunsaturated_fat: 6.74, monounsaturated_fat: 9.29, cholesterol: 154.71, sodium: 1094.52, potassium: 1452.96, sugars: 0.78, vitamin_a: 890.19, vitamin_c: 72.91, vitamin_d: 18.09, calcium: 858.64, iron: 12.14, zinc: 7.15, vitamin_b12: 1.89, magnesium: 393.26, serving_qty: 1 },
  //           { nf_calories: 30, food_name: 'Bean Sprout', nf_total_carbohydrate: 10.5, nf_total_fat: 0.2, nf_dietary_fiber: 2.8, nf_protein: 0.7, saturated_fat: 7.05, polyunsaturated_fat: 6.14, monounsaturated_fat: 3.39, cholesterol: 202.64, sodium: 758.84, potassium: 667.49, sugars: 34.84, vitamin_a: 206.9, vitamin_c: 2.8, vitamin_d: 14.18, calcium: 555.53, iron: 13.2, zinc: 9.31, vitamin_b12: 0.78, magnesium: 132.04, serving_qty: 1 },
  //           { nf_calories: 40, food_name: 'Lime', nf_total_carbohydrate: 8.81, nf_total_fat: 0.44, nf_dietary_fiber: 1.5, nf_protein: 1.87, saturated_fat: 1.68, polyunsaturated_fat: 9.99, monounsaturated_fat: 5.66, cholesterol: 34.6, sodium: 1073.33, potassium: 178.51, sugars: 2.06, vitamin_a: 96.96, vitamin_c: 60.9, vitamin_d: 10.66, calcium: 1217.42, iron: 0.33, zinc: 1.2, vitamin_b12: 1.5, magnesium: 393.63, serving_qty: 1 },
  //           { nf_calories: 149, food_name: 'Chili', nf_total_carbohydrate: 33.1, nf_total_fat: 0.5, nf_dietary_fiber: 2.1, nf_protein: 6.36, saturated_fat: 6.89, polyunsaturated_fat: 5.31, monounsaturated_fat: 9.84, cholesterol: 40.43, sodium: 1878.54, potassium: 2445.09, sugars: 14.77, vitamin_a: 826.7, vitamin_c: 0.6, vitamin_d: 8.74, calcium: 432.87, iron: 1.57, zinc: 7.22, vitamin_b12: 0.75, magnesium: 264.12, serving_qty: 1 },
  //           { nf_calories: 53, food_name: 'Garlic', nf_total_carbohydrate: 4.93, nf_total_fat: 0.57, nf_dietary_fiber: 0.8, nf_protein: 8.14, saturated_fat: 8.99, polyunsaturated_fat: 0.8, monounsaturated_fat: 2.58, cholesterol: 276.2, sodium: 1099.75, potassium: 1589.56, sugars: 35.07, vitamin_a: 136.65, vitamin_c: 56.33, vitamin_d: 15.6, calcium: 1207.51, iron: 15.6, zinc: 0.9, vitamin_b12: 0.59, magnesium: 66.78, serving_qty: 1 },
  //           { nf_calories: 884, food_name: 'Oil', nf_total_carbohydrate: 0, nf_total_fat: 100, nf_dietary_fiber: 0, nf_protein: 0, saturated_fat: 2.63, polyunsaturated_fat: 6.74, monounsaturated_fat: 8.82, cholesterol: 251.56, sodium: 1881.87, potassium: 1284.34, sugars: 25.59, vitamin_a: 170.93, vitamin_c: 77.91, vitamin_d: 3.43, calcium: 905.62, iron: 16.69, zinc: 1.88, vitamin_b12: 1.01, magnesium: 387.74, serving_qty: 1 }
  //         ];     
  //         setFoodItems(foodItemsArray);
  //       } else {
  //         setFoodItems([jsonData]);
  //       }
        
  //     } catch (error) {
  //       console.error('Error fetching nutrition info:', error.message);
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [data]);

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
        const meal_id = await addMeal(selectedItems, meal_type, selectedDate, lastLoggedDate);
        const updatedTrackedMeals = await getTrackedMeals(meal_id);
        const mealsData = await getMealsForDate(user, selectedDate);
  
        setRefresh((prev) => !prev);
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
        setIsLoading(false); // Set loading state to false
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
          <LoadingScreen text={'Analysing Photo'}/>
        ) : (
          <LoadingScreen text={'Logging your Meal'}/>
        )}
      </View>
    );
  };

  const SearchForMoreButton = () => {
    return (
      <View className="mt-3 items-center">
        <View className="w-[200px]">
        <Button 
          mode="outlined"
          icon={() => <FontAwesome name="search" size={15} color="#1434A4" />}
          compact={true} 
          contentStyle={{flexDirection: 'row'}}
          labelStyle={{color:"#1434A4"}}
          onPress={() => router.dismiss(2)}
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
            {foodItems.length === 0 ? (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>No Results Found</Text>
                <SearchForMoreButton/>
              </View>
              
            ) : (
              <>
                <FlatList
                  data={foodItems}
                  renderItem={({ item }) => <FoodListItem item={item} onSelect={handleSelectItem} />}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{ gap: 5 }}
                  className="my-5"
                  ListFooterComponent={SearchForMoreButton}
                />
                <View style={styles.buttonContainer}>
                  <CustomButton
                    title={selectedItems.length > 0 ? `ADD (${selectedItems.length} items)` : "ADD"}
                    containerStyles={selectedItems.length > 0 ? "bg-emerald" : "bg-gray-100"}
                    handlePress={handleAddButtonPress}
                  />
                </View>
              </>
            )}
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
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default Results;
