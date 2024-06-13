import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useGlobalSearchParams, useLocalSearchParams } from 'expo-router';
import FoodLogListItem from '../../components/FoodLogListItem';
import FoodListItem from '../../components/FoodListItem';
import { getOrCreateMealID, getDate, getTrackedMeals, getOrCreateAndFetchMeals, deleteMealItem, calculateTotals } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider.js';
import DailyIntake from '../../components/DailyIntake';

const Log_Page = () => {
  const { meal_type } = useLocalSearchParams();
  const { trackedMeals, setTrackedMeals, selectedDate, user, refresh, setRefresh } = useGlobalContext();
  const [selectedTab, setSelectedTab] = useState('meals');
  const [macros, setMacros] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTrackedData() {
        try {
          const data = await getOrCreateAndFetchMeals(user, meal_type, selectedDate);
          setTrackedMeals(data ? data : []);
          setMacros(calculateTotals(data));
        } catch (error) {
          console.error('Error fetching tracked data:', error);
        }
      }
    fetchTrackedData();
    
  }, [meal_type, refresh]);

  const goToCamera = () => {
    router.push({
      pathname: 'camera',
      params: { meal_type: meal_type },
    });
  };

  const goBack = () => {
    router.back();
  };

  const handleSelectItem = (item) => {
    // Implement your item selection logic here
  };

  const handleDelete = async (mealItemId) => {
    try {
        await deleteMealItem(mealItemId);
        // Trigger a refresh
        setRefresh((prev) => !prev);
    } catch (error) {
        console.error('Error deleting meal item:', error);
    }
  };

  const roundToOneDecimal = (value) => {
    return parseFloat(value).toFixed(1);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <FontAwesome5 name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{meal_type}</Text>
        <TouchableOpacity>
          <FontAwesome5 name="chevron-down" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <TextInput style={styles.searchInput} placeholder="Search for a food" />
      
      
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
          calories={{ consumed: parseFloat(roundToOneDecimal(macros?.totalCalories || 0)), total: 3046 }}
          carbs={{ consumed: parseFloat(roundToOneDecimal(macros?.totalCarbohydrates || 0)), total: 381 }}
          protein={{ consumed: parseFloat(roundToOneDecimal(macros?.totalProtein || 0)), total: 152 }}
          fat={{ consumed: parseFloat(roundToOneDecimal(macros?.totalFats || 0)), total: 102 }}
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
          <Text className="text-xl">Tracked</Text>
          <FlatList
            data={trackedMeals}
            renderItem={({ item }) => <FoodLogListItem item={item} onDelete={handleDelete}/>}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 5 }}
          />
        </View>
      )}
      {selectedTab === 'favorites' && (
        <ScrollView style={styles.content}>
          <View style={styles.emptyState}>
            <MaterialIcons name="favorite-border" size={48} color="gray" />
            <Text style={styles.emptyText}>No favorite foods yet</Text>
            <Text style={styles.emptySubText}>As you track, save your favorite items like tomato, egg or banana</Text>
          </View>
        </ScrollView>
      )}
      {selectedTab === 'recent' && (
        <View style={styles.content}>
          <View style={styles.historyHeader}>
            <TouchableOpacity>
              <Text style={styles.historySort}>Most Recent</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={trackedMeals}
            renderItem={({ item }) => <FoodListItem item={item} onSelect={handleSelectItem} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ gap: 5 }}
          />
        </View>
      )}
    </View>
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
  searchInput: {
    height: 40,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
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
    borderColor: '#000000',
    borderWidth: 1,
  },
  scanButtonText: {
    color: '#36B37E',
    fontWeight: 'bold',
    marginTop: 5,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingVertical: 15,
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
