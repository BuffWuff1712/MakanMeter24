import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const screenWidth = Dimensions.get('window').width;

const HomeSummary = ({ calories, carbs, protein, fat }) => {
  // Function to sanitize the fill value
  const getFillValue = (consumed, total) => {
    const fillValue = (consumed / total) * 100;
    if (!isFinite(fillValue) || fillValue < 0) {
      return 0;
    }
    return fillValue;
  };

  const data = [
    { label: "Carbs", consumed: carbs.consumed, total: carbs.total, 
      colorStart: '#FFD700', colorEnd: '#FFA500'},
    { label: "Protein", consumed: protein.consumed, total: protein.total, 
      colorStart: '#FF69B4', colorEnd: '#800080'},
    { label: "Fats", consumed: fat.consumed, total: fat.total, 
     colorStart: '#87CEEB', colorEnd: '#0000FF'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View className='my-3'>
          <Text style={styles.label}>Daily Intake</Text>
        </View>
        <AnimatedCircularProgress
          size={200}
          width={15}
          lineCap='round'
          style={styles.calorieProgress}
          fill={getFillValue(calories.consumed, calories.total)}
          rotation={255}
          arcSweepAngle={210}
          tintColor="teal"
          tintColorSecondary='limegreen'
          backgroundColor="whitesmoke">
          {
            () => (
              <View className='mb-5 items-center'>
                <Text style={styles.calories}>
                  {Math.round(calories.consumed)}
                </Text>
                <Text className='text-base color-gray-500'>
                  of {calories.total} kcal
                </Text>
              </View>
              
            )
          }
        </AnimatedCircularProgress>
      </View>

      <View style={styles.nutrientsContainer}>
        {data.map((item, index) => (
          <View key={index} className='items-center'>
          <AnimatedCircularProgress
            size={100}
            width={5}
            lineCap='round'
            style={styles.nutrientProgress}
            fill={getFillValue(item.consumed, item.total)}
            rotation={365}
            tintColor={item.colorStart}
            tintColorSecondary={item.colorEnd}
            backgroundColor="whitesmoke">
            {
              () => (
                <View className='items-center'>
                  <Text style={styles.nutrients}>
                    {item.consumed.toFixed(2)}
                  </Text>
                  <Text className='text-xs color-gray-500'>
                    of {Math.round(item.total)} g
                  </Text>
                </View>
                
              )
            }
          </AnimatedCircularProgress>
          <Text className='font-psemibold'>{item.label}</Text>
          </View>
        ))}
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      height: 350,
      width: 350,
      borderRadius: 10,
      padding: 4,
      backgroundColor: '#FFF',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
    },
    progressContainer: {
      alignItems: 'center',
    },
    nutrientsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      width: 330,
      left: 10,
      bottom: 10,
    },
    calorieProgress: {
      marginVertical: 5,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nutrientProgress: {
      marginVertical: 5,
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    calories: {
      fontSize: 35,
      fontWeight: 'bold',
      color: '#000',
    },
    nutrients: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#000',
    },
  });

export default HomeSummary;
