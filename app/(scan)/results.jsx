import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import FoodListItem from '../../components/FoodListItem';
import CustomButton from '../../components/CustomButton';
const { fetchNutritionInfoForIngredients } = require('../../lib/edamam.js');
import { addMeal, calculateTotals, getMealsForDate, getTrackedMeals, insertFoodItems } from '../../lib/supabase.js';
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
          { "cal": 384, "label": "Noodle", "nutrients": { "CHOCDF": 71.3, "ENERC_KCAL": 384, "FAT": 4.44, "FIBTG": 3.3, "PROCNT": 14.2 } },
          { "cal": 71, "label": "Shrimp", "nutrients": { "CHOCDF": 0.91, "ENERC_KCAL": 71, "FAT": 1.01, "FIBTG": 0, "PROCNT": 13.6 } },
          { "cal": 92, "label": "Squid", "nutrients": { "CHOCDF": 3.08, "ENERC_KCAL": 92, "FAT": 1.38, "FIBTG": 0, "PROCNT": 15.6 } },
          { "cal": 32, "label": "Green Onion", "nutrients": { "CHOCDF": 7.34, "ENERC_KCAL": 32, "FAT": 0.19, "FIBTG": 2.6, "PROCNT": 1.83 } },
          { "cal": 30, "label": "Bean Sprout", "nutrients": { "CHOCDF": 5.94, "ENERC_KCAL": 30, "FAT": 0.18, "FIBTG": 1.8, "PROCNT": 3.04 } },
          { "cal": 30, "label": "Lime", "nutrients": { "CHOCDF": 10.5, "ENERC_KCAL": 30, "FAT": 0.2, "FIBTG": 2.8, "PROCNT": 0.7 } },
          { "cal": 40, "label": "Chili", "nutrients": { "CHOCDF": 8.81, "ENERC_KCAL": 40, "FAT": 0.44, "FIBTG": 1.5, "PROCNT": 1.87 } },
          { "cal": 149, "label": "Garlic", "nutrients": { "CHOCDF": 33.1, "ENERC_KCAL": 149, "FAT": 0.5, "FIBTG": 2.1, "PROCNT": 6.36 } },
          { "cal": 53, "label": "Soy Sauce", "nutrients": { "CHOCDF": 4.93, "ENERC_KCAL": 53, "FAT": 0.57, "FIBTG": 0.8, "PROCNT": 8.14 } },
          { "cal": 884, "label": "Oil", "nutrients": { "CHOCDF": 0, "ENERC_KCAL": 884, "FAT": 100, "FIBTG": 0, "PROCNT": 0 } }
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
