import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import CustomButton from '../../components/CustomButton';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { images } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../../context/GlobalProvider';

const PlanInfoPage = () => {
  const { item } = useLocalSearchParams(); // Get the item from route params
  const { setCurrentPlan } = useGlobalContext();
  const plan = JSON.parse(item);
  const [selectedTab, setSelectedTab] = useState(0);
  const translateX = useSharedValue(0);

  const aims = plan.aims;
  const objectives = plan.objectives;

  const handleSwitchTab = (index) => {
    translateX.value = withSpring(index * 180, {
      damping: 30, // Adjust this value to make the spring less bouncy
      stiffness: 250, // Adjust this value to control the speed of the animation
    });
    setSelectedTab(index);
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const handleStartPlan = () => {
    setCurrentPlan({
      name: plan.name,
      description: plan.description,
      // Add other properties as needed based on your data structure
    })
    router.navigate('plan');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image source={images[plan.image]} style={styles.image} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.planTitle}>{plan.name}</Text>
          <View style={styles.tabContainer}>
            <TouchableOpacity onPress={() => handleSwitchTab(0)} style={styles.tabButton}>
              <Text style={selectedTab === 0 ? styles.tabActive : styles.tabInactive}>OVERVIEW</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleSwitchTab(1)} style={styles.tabButton}>
              <Text style={selectedTab === 1 ? styles.tabActive : styles.tabInactive}>SCHEDULE</Text>
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />

          {selectedTab === 0 && (
            <>
              <View>
                <Text style={styles.sectionText}>{plan.details}</Text>
              </View>
              <View className='my-5'>
                <View className='flex-row justify-between my-2'>
                  <Text>Duration</Text>
                  <Text>{plan.duration} Days</Text>
                </View>
                <View className='flex-row justify-between my-2'>
                  <Text>Difficulty</Text>
                  <Text>{plan.difficulty}</Text>
                </View>
                <View className='flex-row justify-between my-2'>
                  <Text>Commitment</Text>
                  <Text>{plan.commitment}</Text>
                </View>
              </View>
              <View className='my-5'>
                <Text style={styles.sectionTitle}>Choose this plan if you want to</Text>
                {aims.map((item, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bulletText}>{'\u2022'}</Text>
                    <Text style={styles.bulletItemText}>{item}</Text>
                  </View>
                ))}
              </View>
              <View className='my-5'>
                <Text style={styles.sectionTitle}>What you will do</Text>
                {objectives.map((item, index) => (
                  <View key={index} style={styles.bulletItem}>
                    <Text style={styles.bulletText}>{'\u2022'}</Text>
                    <Text style={styles.bulletItemText}>{item}</Text>
                  </View>
                ))}
              </View>
              <View className='my-5'>
                <Text style={styles.sectionTitle}>Guidelines</Text>
                <Text style={styles.sectionText}>{plan.guideline}</Text>
              </View>
            </>
          )}

          {selectedTab === 1 && (
            <>
              {plan.schedule.map((item, index) => (
                <View key={index} className='my-3'>
                  <Text className='font-bold'>Week {index + 1}</Text>
                  <Text>{item}</Text>
                </View>
              ))} 
            </>
          )}
        </View>
      </ScrollView>
      <View className='items-center justify-center'>
        <CustomButton title="Start Plan" containerStyles="bg-emerald w-[90%]" handlePress={handleStartPlan}/>
      </View>
    </SafeAreaView>
  );
};

export default PlanInfoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -60,
  },
  image: {
    width: '100%',
    height: 300,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  planTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-evenly',
  },
  tabButton: {
    paddingHorizontal: 50,
    paddingBottom: 10,
  },
  tabActive: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  tabInactive: {
    fontWeight: 'bold',
    color: '#aaa',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  bulletText: {
    fontSize: 20,
    lineHeight: 24,
    marginRight: 10,
  },
  bulletItemText: {
    fontSize: 16,
    lineHeight: 20,
  },
  indicator: {
    position: 'absolute',
    top: 102,
    left: 20,
    width: 175, // Adjust based on the width of each segment
    height: 3,
    backgroundColor: '#007bff',
    zIndex: -1,
  },
});
