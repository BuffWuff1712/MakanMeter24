import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FoodLogListItem from '../../components/FoodLogListItem';
import { getOrCreateAndFetchMeals, deleteMealItem, getFavoriteFoods, addMeal } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import DailyIntake from '../../components/DailyIntake';
import FoodHistory from '../../components/FoodHistory.jsx';
import AutoCompleteSearchBar from '../../components/AutoCompleteSearchBar.jsx';
import FavouriteListItem from '../../components/FavouriteListItem.jsx';
import { Feather } from '@expo/vector-icons';

const Log_Page = () => {
  const { meal_type } = useLocalSearchParams();
  const { trackedMeals, setTrackedMeals, isAsyncOperationsComplete, setIsAsyncOperationsComplete,
    selectedDate, user, refresh, setRefresh, mealsData } = useGlobalContext();
  const [favourites, setFavourites] = useState([]);
  const [selectedTab, setSelectedTab] = useState('meals');
  const router = useRouter();

  useEffect(() => {
    const fetchTrackedData = async () => {
      try {
        setIsAsyncOperationsComplete(false); 
        const data = await getOrCreateAndFetchMeals(user, meal_type, selectedDate);
        const favouriteFoods = await getFavoriteFoods(user);
        setTrackedMeals(data ? data : []);
        setFavourites(favouriteFoods ? favouriteFoods : []);
      } catch (error) {
        console.error('Error fetching tracked data:', error);
      } finally {
        setIsAsyncOperationsComplete(true); // Signal that the async operations have completed
      }
    };

    fetchTrackedData();
  }, [meal_type, refresh, user, selectedDate]);

  const goToCamera = () => {
    router.push({
      pathname: 'camera',
      params: { meal_type: meal_type },
    });
  };

  const goBack = () => {
    router.back();
  };

  const handleAdd = async (foodItem) => {
    await addMeal([foodItem], meal_type, selectedDate);
    setRefresh((prev) => !prev);
    Alert.alert('item added to tracked');
  };

  const handleDelete = async (mealItemId) => {
    try {
      await deleteMealItem(mealItemId);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error('Error deleting meal item:', error);
    }
  };

  const roundToOneDecimal = (value) => {
    return parseFloat(value).toFixed(1);
  };

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{meal_type}</Text>
          <TouchableOpacity>
            <FontAwesome5 name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        <AutoCompleteSearchBar
          trackedMeals={trackedMeals}
          meal_type={meal_type}
        />

        <View style={styles.scanButtons}>
          <TouchableOpacity style={styles.scanButton} onPress={goToCamera}>
            <FontAwesome5 name="camera" size={30} color="#36B37E" />
            <Text style={styles.scanButtonText}>Scan a Meal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton} onPress={goToCamera}>
            <FontAwesome5 name="barcode" size={30} color="#36B37E" />
            <Text style={styles.scanButtonText}>Scan a Barcode</Text>
          </TouchableOpacity>
        </View>

        <DailyIntake
          calories={{ consumed: parseFloat(roundToOneDecimal(mealsData?.Summary?.totalCalories || 0)), total: 3046 }}
          carbs={{ consumed: parseFloat(roundToOneDecimal(mealsData?.Summary?.totalCarbs || 0)), total: 381 }}
          protein={{ consumed: parseFloat(roundToOneDecimal(mealsData?.Summary?.totalProtein || 0)), total: 152 }}
          fat={{ consumed: parseFloat(roundToOneDecimal(mealsData?.Summary?.totalFats || 0)), total: 102 }}
        />

        <View style={styles.tabBar}>
          <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('meals')}>
            <MaterialIcons name="restaurant-menu" size={24} color={selectedTab === 'meals' ? '#36B37E' : 'gray'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('favorites')}>
            <MaterialIcons name="favorite" size={24} color={selectedTab === 'favorites' ? '#36B37E' : 'gray'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setSelectedTab('recent')}>
            <MaterialIcons name="update" size={24} color={selectedTab === 'recent' ? '#36B37E' : 'gray'} />
          </TouchableOpacity>
        </View>

        {selectedTab === 'meals' && (
          <View style={styles.content}>
            <Text className="text-xl my-3 mx-2 font-semibold color-gray-500">Tracking</Text>
            {trackedMeals.length > 0 ? (
            <FlatList
              data={trackedMeals}
              renderItem={({ item }) => <FoodLogListItem item={item} onDelete={handleDelete} />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 5 }}
            />
            ) : (                
                <View style={styles.emptyState}>
                  <Feather name="search" size={50} color="black" />
                  <Text style={styles.emptyText}>Start Logging your Food!</Text>
                  <Text style={styles.emptySubText}>
                    To begin, scan your meal or search it up
                  </Text>
                </View>
            )}
          </View>
        )}
        {selectedTab === 'favorites' && (
          <View style={styles.content}>
            {favourites.length > 0 ? (
            <FlatList
              data={favourites}
              renderItem={({ item }) => <FavouriteListItem item={item} onAdd={handleAdd} />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 5 }}
            />
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="favorite-border" size={48} color="gray" />
                <Text style={styles.emptyText}>No favorite foods yet</Text>
                <Text style={styles.emptySubText}>As you track, save your favorite items like tomato, egg or banana</Text>
            </View>
            )}
            
          </View>
        )}
        {selectedTab === 'recent' && (
          <View style={styles.content}>
            <View style={styles.historyHeader}>
              <Text className="text-xl my-3 mx-2 font-semibold color-gray-500">History</Text>
              <TouchableOpacity>
                <Text style={styles.historySort}>Most Recent</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={trackedMeals}
              renderItem={({ item }) => <FoodHistory item={item} />}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{ gap: 5 }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    padding: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36B37E',
  },
  scanButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  scanButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 40,
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  scanButtonText: {
    color: '#36B37E',
    fontWeight: 'bold',
    marginTop: 5,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  historySort: {
    fontSize: 16,
    color: '#36B37E',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tab: {
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  emptySubText: {
    color: 'gray',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
  },
});

export default Log_Page;
