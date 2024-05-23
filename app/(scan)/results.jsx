import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import FoodListItem from '../../components/FoodListItem';
import CustomButton from '../../components/CustomButton';
import { useEffect, useState } from 'react';
const { fetchNutritionInfoForIngredients } = require('../../lib/edamam.js');
import { SafeAreaView } from 'react-native-safe-area-context';

const Results = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data } = useLocalSearchParams();

  useEffect(() => {
    //Fetches data of the food items from the foodbase API
    const fetchData = async () => {
      try {
        const jsonData = JSON.parse(data);
        const ingredients = jsonData.ingredients;
        const foodItemsArray = await fetchNutritionInfoForIngredients(ingredients);
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

  const handleAddButtonPress = () => {
    // if (selectedItems.length > 0) {
    //   navigation.navigate('SelectedFoodsPage', { selectedItems });
    // } else {
    //   Alert.alert("No items selected", "Please select at least one item to add.");
    // }
  };

  return (
    <View className="flex-1 justify-center">
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Analyzing ingredients...</Text>
        </View>
      ) :(
        <View style={styles.container}>
          <View>
            <Text style={styles.headerText}>BORDER</Text>
          </View>
          <FlatList
            data={foodItems}
            renderItem={({ item }) => <FoodListItem item={item} onSelect={handleSelectItem}/>}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 5 }}
          />
          <View style={styles.buttonContainer}>
            <CustomButton 
              title="ADD"
              containerStyles="bg-blue"
              handlePress={handleAddButtonPress}
            />
          </View>
        </View>
      )}
    </View>
    )
  }
      


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
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
  },

  loadingText: {
      marginTop: 10,
      fontSize: 18,
      color: '#000',
  },
});

export default Results;