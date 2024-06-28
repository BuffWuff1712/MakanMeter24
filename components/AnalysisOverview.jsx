import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { fetchGoal, getDailyTrends, getWeeklyTrends } from '../lib/supabase';
import { useGlobalContext } from '../context/GlobalProvider';
import CaloriesTrendsDashboard from './CaloriesTrends';
import MacroTrendsDashboard from './MacroTrends';

const screenWidth = Dimensions.get('window').width;
const scrollableHeight = 550; // Adjust the height of the scrollable area


const AnalysisOverview = () => {
  const { user, period } = useGlobalContext();
  const [index, setIndex] = useState(0);
  const [calorieGoal, setCalorieGoal] = useState([]);
  const [testData, setTestData] = useState([[], []]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        const temp = await fetchGoal(user, 'caloric_intake');
        if (period === 1) {
          result = await getWeeklyTrends(user);
        } else {
          result = await getDailyTrends(user);
        }
        setCalorieGoal(temp ? temp : []);
        setTestData(result ? [result, result]: [[], []]);
      } catch (error) {
        console.log('Error in AnalysisOverview; ',error);
        setTestData([[], []]);
      }
    };
    fetchData();
  }, [period, user]);


  const renderDashboardItem = ({ item, index }) => {
    let DashboardComponent;
    if (index === 0) {
      DashboardComponent = CaloriesTrendsDashboard;
    } else {
      DashboardComponent = MacroTrendsDashboard;
    }

    return (
    <Animatable.View animation="fadeIn" duration={800} style={styles.carouselItem}>
      <DashboardComponent data={item} goal={calorieGoal}/>
    </Animatable.View>
  )};

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {testData.map((_, idx) => (
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
            data={testData} // Array of data for each dashboard
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
    marginTop: -20, // Adjust the margin to position dots closer to the dashboard
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
