import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList } from 'react-native';
import { fetchGoal, userMonthHistory, userWeekHistory } from '../lib/supabase';
import { useGlobalContext } from '../context/GlobalProvider';
import WeightTrendsDashboard from './WeightTrend';
import WaterTrendsDashboard from './WaterTrend';

const screenWidth = Dimensions.get('window').width;
const scrollableHeight = 550; // Adjust the height of the scrollable area

const ProgressOverview = () => {
  const { user, period, refresh } = useGlobalContext();
  const [index, setIndex] = useState(0);
  const [weightGoal, setWeightGoal] = useState([]);
  const [displayData, setDisplayData] = useState([[], []]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        const temp = await fetchGoal(user, 'weight');
        if (period === 0) {
          result = await userWeekHistory(user);
        } else {
          result = await userMonthHistory(user);
        }
        setWeightGoal(temp ? temp : []);
        setDisplayData(result ? [result, result] : [[], []]); // Assuming you want to display the same data for both dashboards
      } catch (error) {
        console.log('Error in Progress Overview: ', error);
        setDisplayData([[], []]); // Set empty data in case of error
      }
    }
    fetchData();
  }, [period, user, refresh]);

  const renderDashboardItem = ({ item, index }) => {
    let DashboardComponent;
    if (index === 0) {
      DashboardComponent = WeightTrendsDashboard;
    } else {
      DashboardComponent = WaterTrendsDashboard;
    }

    return (
      <View style={styles.carouselItem}>
        <DashboardComponent data={item} goal={weightGoal} />
      </View>
    );
  };

  const renderDotIndicator = () => {
    return (
      <View style={styles.dotContainer}>
        {displayData.map((_, idx) => (
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
        data={displayData} // Array of data for each dashboard
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

export default ProgressOverview;
