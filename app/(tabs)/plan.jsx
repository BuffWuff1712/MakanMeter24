/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import PlanCard from '../../components/PlanCard';
import images from '../../constants/images';

// Sample Data
const categories = [
  {
    id: '1',
    title: 'Weight Loss',
    data: [
      { id: 'w1', name: 'Keto Diet', description: 'Low carb, high fat', image: images.fruit_salad },
      { id: 'w2', name: 'Low Calorie', description: 'Reduce calorie intake', image: images.fruit_salad },
      { id: 'w3', name: 'Intermittent Fasting', description: 'Fasting and eating periods' },
    ],
  },
  {
    id: '2',
    title: 'Muscle Gain',
    data: [
      { id: 'm1', name: 'High Protein', description: 'Protein-rich meals' },
      { id: 'm2', name: 'Bodybuilding', description: 'Structured for muscle gain' },
      { id: 'm3', name: 'Paleo', description: 'Whole foods, lean proteins' },
    ],
  },
  {
    id: '3',
    title: 'Maintenance',
    data: [
      { id: 't1', name: 'Balanced Diet', description: 'Nutrient-rich balanced meals' },
      { id: 't2', name: 'Mediterranean', description: 'Heart-healthy foods' },
      { id: 't3', name: 'Whole30', description: 'Whole, unprocessed foods' },
    ],
  },
  {
    id: '4',
    title: 'Vegan',
    data: [
      { id: 'v1', name: 'Vegan Balanced', description: 'Complete vegan diet' },
      { id: 'v2', name: 'Raw Vegan', description: 'Unprocessed, raw foods' },
      { id: 'v3', name: 'High Protein Vegan', description: 'Protein-rich vegan meals' },
    ],
  },
];

const Plan = () => {
  const [currentPlan, setCurrentPlan] = useState(null);

  useEffect(() => {
    // Fetch current plan from backend or local storage
    const fetchCurrentPlan = async () => {
      // Replace with your data fetching logic
      const plan = null; // Assume no current plan
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  const renderPlanCard = ({ item }) => (
    <PlanCard name={item.name} description={item.description}/>
  );

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        horizontal
        renderItem={renderPlanCard}
        keyExtractor={(plan) => plan.id}
        contentContainerStyle={styles.planList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View className='bg-emerald-300 mb-10 min-h-[50vh] justify-end'>
            <View style={styles.headerContainer}>
              <Text style={styles.pageTitle}>Active Plan</Text>
            </View>
            <View style={styles.currentPlanContainer}>
              {currentPlan ? (
                <View style={styles.currentPlanCard}>
                  <Text style={styles.currentPlanTitle}>Current Plan</Text>
                  <Text style={styles.planTitle}>{currentPlan.name}</Text>
                  <Text style={styles.planDescription}>{currentPlan.description}</Text>
                </View>
              ) : (
                <View style={styles.noPlanCard}>
                  
                  <Text style={styles.noPlanText}>You are not on any plan now.</Text>
                  <Text style={styles.noPlanPrompt}>Choose a plan below or create your own custom plan.</Text>
                  <View className="flex-row justify-between mt-5">
                    <Button 
                        mode="contained"
                        className='mx-2'
                        labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                        buttonColor='#50C878' 
                        onPress={() => console.log('Pressed')}>
                      TAKE A TEST
                    </Button>
                    <Button 
                        mode="contained"
                        className='mx-2 px-0'
                        labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                        buttonColor='#50C878' 
                        onPress={() => console.log('Pressed')}>
                      CUSTOMISE
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        }
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(category) => category.id}
        contentContainerStyle={styles.categoryList}
        
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -100,
    marginBottom: -30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customButtonText: {
    color: '#007bff',
    fontSize: 16,
    marginLeft: 5,
  },
  currentPlanContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  currentPlanCard: {
    backgroundColor: '#d3f8e2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  currentPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noPlanCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  noPlanText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
  },
  noPlanPrompt: {
    textAlign:'center',
    fontSize: 14,
    color: '#721c24',
  },
  categoryContainer: {
    marginVertical: 10, // Increase vertical space between categories
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  planList: {
    paddingHorizontal: 20,
    paddingVertical: 10, // Add vertical padding to avoid cutting off
  },
  planCard: {
    backgroundColor: '#c7d2fe',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5, // Add horizontal margin between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Plan;*/

//new draft here 
// app/(home)/plan.jsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { useNavigation } from 'expo-router';
import PlanCard from '../../components/PlanCard';
import images from '../../constants/images';

const categories = [
  {
    id: '1',
    title: 'Weight Loss',
    data: [
      { id: 'w1', name: 'Keto Diet', description: 'Low carb, high fat', image: images.fruit_salad },
      { id: 'w2', name: 'Low Calorie', description: 'Reduce calorie intake', image: images.fruit_salad },
      { id: 'w3', name: 'Intermittent Fasting', description: 'Fasting and eating periods' },
    ],
  },
  {
    id: '2',
    title: 'Muscle Gain',
    data: [
      { id: 'm1', name: 'High Protein', description: 'Protein-rich meals' },
      { id: 'm2', name: 'Bodybuilding', description: 'Structured for muscle gain' },
      { id: 'm3', name: 'Paleo', description: 'Whole foods, lean proteins' },
    ],
  },
  {
    id: '3',
    title: 'Maintenance',
    data: [
      { id: 't1', name: 'Balanced Diet', description: 'Nutrient-rich balanced meals' },
      { id: 't2', name: 'Mediterranean', description: 'Heart-healthy foods' },
      { id: 't3', name: 'Whole30', description: 'Whole, unprocessed foods' },
    ],
  },
  {
    id: '4',
    title: 'Vegan',
    data: [
      { id: 'v1', name: 'Vegan Balanced', description: 'Complete vegan diet' },
      { id: 'v2', name: 'Raw Vegan', description: 'Unprocessed, raw foods' },
      { id: 'v3', name: 'High Protein Vegan', description: 'Protein-rich vegan meals' },
    ],
  },
];

const Plan = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentPlan = async () => {
      const plan = null;
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  const renderPlanCard = ({ item }) => (
    <PlanCard name={item.name} description={item.description} />
  );

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={item.data}
        horizontal
        renderItem={renderPlanCard}
        keyExtractor={(plan) => plan.id}
        contentContainerStyle={styles.planList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View className='bg-emerald-300 mb-10 min-h-[50vh] justify-end'>
            <View style={styles.headerContainer}>
              <Text style={styles.pageTitle}>Active Plan</Text>
            </View>
            <View style={styles.currentPlanContainer}>
              {currentPlan ? (
                <View style={styles.currentPlanCard}>
                  <Text style={styles.currentPlanTitle}>Current Plan</Text>
                  <Text style={styles.planTitle}>{currentPlan.name}</Text>
                  <Text style={styles.planDescription}>{currentPlan.description}</Text>
                </View>
              ) : (
                <View style={styles.noPlanCard}>
                  <Text style={styles.noPlanText}>You are not on any plan now.</Text>
                  <Text style={styles.noPlanPrompt}>Choose a plan below or create your own custom plan.</Text>
                  <View className="flex-row justify-between mt-5">
                    <Button 
                        mode="contained"
                        className='mx-2'
                        labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                        buttonColor='#50C878' 
                        onPress={() => navigation.navigate('(test)/TestScreen')}>
                      TAKE A TEST
                    </Button>
                    <Button 
                        mode="contained"
                        className='mx-2 px-0'
                        labelStyle={{fontSize: 15, fontWeight: 'bold'}}
                        buttonColor='#50C878' 
                        onPress={() => console.log('Pressed')}>
                      CUSTOMISE
                    </Button>
                  </View>
                </View>
              )}
            </View>
          </View>
        }
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(category) => category.id}
        contentContainerStyle={styles.categoryList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -100,
    marginBottom: -30,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customButtonText: {
    color: '#007bff',
    fontSize: 16,
    marginLeft: 5,
  },
  currentPlanContainer: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  currentPlanCard: {
    backgroundColor: '#d3f8e2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  currentPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noPlanCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  noPlanText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#721c24',
  },
  noPlanPrompt: {
    textAlign:'center',
    fontSize: 14,
    color: '#721c24',
  },
  categoryContainer: {
    marginVertical: 10, // Increase vertical space between categories
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  planList: {
    paddingHorizontal: 20,
    paddingVertical: 10, // Add vertical padding to avoid cutting off
  },
  planCard: {
    backgroundColor: '#c7d2fe',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5, // Add horizontal margin between cards
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Plan;
