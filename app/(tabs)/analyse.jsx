import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import StreakBar from '../../components/StreakBar';
import AnalysisOverview from '../../components/AnalysisOverview';

const screenWidth = Dimensions.get('window').width;
const scrollableHeight = 300; // Adjust the height of the scrollable area


const AnalyticsPage = () => {

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View style={styles.container}>
          <View className="px-5 pt-20">
            <Text style={styles.title}>Overview</Text>
          </View>
          <AnalysisOverview/>

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
                <Text className="font-bold text-xl mr-3">Tips</Text>
                <Icon name="lightbulb-o" size={30} color={"gold"}/>
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
    marginBottom: 30,
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default AnalyticsPage;
