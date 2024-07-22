//new draft here 
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import PlanCard from '../../components/PlanCard';
import images from '../../constants/images';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from '../../categoryData.json';

const Plan = () => {
  const { currentPlan, setCurrentPlan } = useGlobalContext();

  useEffect(() => {
    // Fetch current plan from local storage
    const fetchCurrentPlan = async () => {
      try {
        const plan = await AsyncStorage.getItem('currentPlan');
        if (plan !== null) {
          setCurrentPlan(JSON.parse(plan));
        }
      } catch (error) {
        console.log('Failed to fetch plan from storage', error);
      }
    };

    fetchCurrentPlan();
  }, []);

  // Save current plan to local storage
  const saveCurrentPlanToStorage = async (plan) => {
    try {
      await AsyncStorage.setItem('currentPlan', JSON.stringify(plan));
      setCurrentPlan(plan);
    } catch (error) {
      console.log('Failed to save plan to storage', error);
    }
  };

  // Clear current plan from local storage
  const clearCurrentPlanFromStorage = async () => {
    try {
      await AsyncStorage.removeItem('currentPlan');
      setCurrentPlan(null);
    } catch (error) {
      console.log('Failed to clear plan from storage', error);
    }
  };

  // Function to render each plan card item
  const renderPlanCard = ({ item }) => (
    <PlanCard item={JSON.stringify(item)} name={item.name} description={item.description} />
  );

  // Function to render each category with its list of plans
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

  // Function to handle pressing "Take a Test" button
  const handleTakeTest = () => {
    router.navigate({ pathname: 'category', params: { categoriesList: JSON.stringify(categories) } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Plan your Diet</Text>
        <View style={styles.currentPlanContainer}>
          {currentPlan ? (
            <View style={styles.currentPlanCard}>
              <Text style={styles.currentPlanTitle}>Current Plan</Text>
              <Text style={styles.planTitle}>{currentPlan.name}</Text>
              <Text style={styles.planDescription}>{currentPlan.description}</Text>
              <Button
                mode="contained"
                style={styles.deleteButton}
                labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
                onPress={clearCurrentPlanFromStorage}
              >
                DELETE PLAN
              </Button>
            </View>
          ) : (
            <View style={styles.noPlanCard}>
              <Text style={styles.noPlanText}>You are not on any plan now.</Text>
              <Text style={styles.noPlanPrompt}>Choose a plan below or create your own custom plan.</Text>
              <View style={styles.buttonContainer}>
                <Button
                  mode="contained"
                  style={styles.customButton}
                  labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
                  onPress={handleTakeTest}
                >
                  TAKE A TEST
                </Button>
                <Button
                  mode="contained"
                  style={styles.customButton}
                  labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
                  onPress={() => console.log('Pressed CUSTOMISE')}
                >
                  CUSTOMISE
                </Button>
              </View>
            </View>
          )}
        </View>
      </View>

      <View style={styles.contentContainer}>
        

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(category) => category.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 0,
  },
  headerContainer: {
    backgroundColor: '#50C878',
    paddingHorizontal: 20,
    paddingTop: 70,
    marginBottom: 10,
    marginTop: -60,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 10,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customButton: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    marginTop: 10,
  },
  currentPlanContainer: {
    marginVertical: 20,
  },
  currentPlanCard: {
    backgroundColor: '#d3f8e2',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  currentPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 16,
    textAlign: 'center',
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
    fontSize: 14,
    color: '#721c24',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  categoryList: {
    flexGrow: 1,
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  planList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 50,
    borderRadius: 10,
  },
  modalContainer: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 5,
  },
  categoryButtonText: {
    fontSize: 16,
  },
});

export default Plan;

