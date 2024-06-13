import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { getDailyTrends } from '../../lib/supabase';
import { useGlobalContext } from '../../context/GlobalProvider';
import DailyTrendsDashboard from '../../components/DailyTrends';
import { SafeAreaView } from 'react-native-safe-area-context';
import StreakBar from '../../components/StreakBar';

const screenWidth = Dimensions.get('window').width;
const scrollableHeight = 300; // Adjust the height of the scrollable area

const dailyData_1 = [
  { "meal_date": "08/06", "total_calories": 1000, "total_carbohydrates": 300, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "09/06", "total_calories": 2000, "total_carbohydrates": 600, "total_fats": 20, "total_protein": 80 }, 
  { "meal_date": "10/06", "total_calories": 1000, "total_carbohydrates": 300, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "11/06", "total_calories": 3000, "total_carbohydrates": 0, "total_fats": 0, "total_protein": 0 },
  { "meal_date": "12/06", "total_calories": 2500, "total_carbohydrates": 300, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "13/06", "total_calories": 1500, "total_carbohydrates": 600, "total_fats": 20, "total_protein": 80 }, 
  { "meal_date": "14/06", "total_calories": 500, "total_carbohydrates": 300, "total_fats": 10, "total_protein": 40 }
];

const dailyData_2 = [
  { "meal_date": "08/06", "total_calories": 500, "total_carbohydrates": 500, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "09/06", "total_calories": 2000, "total_carbohydrates": 100, "total_fats": 20, "total_protein": 80 }, 
  { "meal_date": "10/06", "total_calories": 750, "total_carbohydrates": 900, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "11/06", "total_calories": 2800, "total_carbohydrates": 700, "total_fats": 0, "total_protein": 0 },
  { "meal_date": "12/06", "total_calories": 1400, "total_carbohydrates": 500, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "13/06", "total_calories": 2100, "total_carbohydrates": 800, "total_fats": 20, "total_protein": 80 }, 
  { "meal_date": "14/06", "total_calories": 800, "total_carbohydrates": 50, "total_fats": 10, "total_protein": 40 }
];

const allData = [dailyData_1, dailyData_2];

const AnalyticsPage = () => {
  const { user } = useGlobalContext();
  const [index, setIndex] = useState(0);

  const handlePress = async () => {
    const result = await getDailyTrends(user);
    console.log("results: ", result);
  };

  const renderDashboardItem = ({ item }) => (
    <Animatable.View animation="fadeIn" duration={800} style={styles.carouselItem}>
      <DailyTrendsDashboard data={item} />
    </Animatable.View>
  );

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {allData.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              { opacity: idx === index ? 1 : 0.3 }
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View style={styles.container}>
          <View className="px-5 pt-20">
            <Text style={styles.title}>Overview</Text>
          </View>
          <View style={styles.scrollableArea}>
            <FlatList
              data={allData} // Array of data for each dashboard
              renderItem={renderDashboardItem}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                const contentOffsetX = event.nativeEvent.contentOffset.x;
                const newIndex = Math.floor(contentOffsetX / screenWidth);
                if (newIndex !== index) {
                  setIndex(newIndex);
                }
              }}
            />
            {renderDotIndicator()}
          </View>

          <View className="px-5 pt-10">
            <Text style={styles.title}>Progress</Text>
          </View>
          <View className="items-center">
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Current Progress Towards Goals</Text>
              <Text>Calories Consumed: 1500 / 2000</Text>
              <Text>Protein Intake: 60g / 100g</Text>
              <Text>Carbohydrates Intake: 150g / 250g</Text>
              <Text>Fat Intake: 50g / 70g</Text>
            </View>
          </View>

          <View className="items-center">
            <View style={styles.tipsContainer}>
              <View style={styles.tipsHeader}>
                <Text className="font-bold text-xl">Tips</Text>
              </View>
              <Text className="text-m">
                  Your meals have been high in sugars recently. Reduce sugar intake by avoiding sugary drinks.
              </Text>
            </View>
          </View>

          <View className="px-5 pt-10">
              <Text style={styles.title}>Streak Progress</Text>
          </View>
          <View className="items-center">
            <StreakBar day={17} totalDays={30}/>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollableArea: {
    height: scrollableHeight, // Set the height of the scrollable area
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 10, // Adjust the margin to position the button closer to the dots
  },
  button: {
    width: 200, // Adjust the width
    height: 60, // Adjust the height
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
    marginTop: 10, // Adjust margin to position the button below the FlatList
  },
  carouselItem: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15, // Adjust the margin to position dots closer to the dashboard
    marginBottom: 10, // Add margin bottom to position the dots closer to the button
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginHorizontal: 5,
  },
  section: {
    marginTop: 20,
    width: "90%",
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  tipsContainer: {
    marginTop: 20,
    width: "90%",
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 13,
    paddingBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default AnalyticsPage;
