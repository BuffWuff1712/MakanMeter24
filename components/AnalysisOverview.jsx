import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getDailyTrends } from '../lib/supabase';
import { useGlobalContext } from '../context/GlobalProvider';
import DailyTrendsDashboard from './DailyTrends';
import MacroTrendsDashboard from './MacroTrends';
import TrendsDateRange from './TrendsDateRange';

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
  { "meal_date": "10/06", "total_calories": 750, "total_carbohydrates": 200, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "11/06", "total_calories": 2800, "total_carbohydrates": 300, "total_fats": 30, "total_protein": 100 },
  { "meal_date": "12/06", "total_calories": 1400, "total_carbohydrates": 500, "total_fats": 10, "total_protein": 40 }, 
  { "meal_date": "13/06", "total_calories": 2100, "total_carbohydrates": 400, "total_fats": 20, "total_protein": 80 }, 
  { "meal_date": "14/06", "total_calories": 800, "total_carbohydrates": 300, "total_fats": 10, "total_protein": 40 }
];

const allData = [dailyData_1, dailyData_2];

const AnalysisOverview = () => {
  const { user } = useGlobalContext();
  const [index, setIndex] = useState(0);

  const handlePress = async () => {
    const result = await getDailyTrends(user);
    console.log("results: ", result);
  };

  const renderDashboardItem = ({ item, index }) => {
    let DashboardComponent;
    if (index === 0) {
      DashboardComponent = DailyTrendsDashboard;
    } else {
      DashboardComponent = MacroTrendsDashboard;
    }

    return (
    <Animatable.View animation="fadeIn" duration={800} style={styles.carouselItem}>
      <DashboardComponent data={item} />
    </Animatable.View>
  )};

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
  );
};

const styles = StyleSheet.create({
  scrollableArea: {
    height: scrollableHeight, // Set the height of the scrollable area
    alignItems: 'center',
    backgroundColor: '#fff',
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
});

export default AnalysisOverview;
