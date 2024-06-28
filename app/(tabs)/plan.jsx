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
/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const questions = [
  {
    id: 'q1',
    question: 'What is your primary goal?',
    options: ['Weight Loss', 'Muscle Gain', 'Maintain', 'Vegan'],
  },
  {
    id: 'q2',
    question: 'What is your diet preference?',
    options: ['Low Carb', 'High Protein', 'Balanced', 'Vegan'],
  },
  {
    id: 'q3',
    question: 'Do you have any health conditions?',
    options: ['None', 'Diabetes', 'Heart Disease', 'Other'],
  },
];

const getRecommendations = (answers) => {
  // Example recommendation logic based on answers
  if (answers.goal === 'Weight Loss' && answers.diet === 'Low Carb') {
    return 'We recommend trying the Keto Diet.';
  } else if (answers.goal === 'Muscle Gain' && answers.diet === 'High Protein') {
    return 'We recommend trying a High Protein diet.';
  } else if (answers.goal === 'Maintenance' && answers.diet === 'Balanced') {
    return 'We recommend a Balanced Diet.';
  } else if (answers.goal === 'Vegan' && answers.diet === 'Vegan') {
    return 'We recommend a Vegan Balanced diet.';
  } else {
    return 'Based on your answers, we recommend consulting a nutritionist for a personalized diet plan.';
  }
};

const Plan = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({ goal: '', diet: '', health: '' });
  const [recommendation, setRecommendation] = useState('');

  useEffect(() => {
    // Fetch current plan from backend or local storage
    const fetchCurrentPlan = async () => {
      // Replace with your data fetching logic
      const plan = null;
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  const handleAnswer = (answer) => {
    const key = Object.keys(answers)[questionIndex];
    setAnswers((prevAnswers) => ({ ...prevAnswers, [key]: answer }));

    if (questionIndex === questions.length - 1) {
      const newRecommendation = getRecommendations({ ...answers, [key]: answer });
      setRecommendation(newRecommendation);
      setModalVisible(false);
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  };

  const startTest = () => {
    setModalVisible(true);
    setQuestionIndex(0);
    setAnswers({ goal: '', diet: '', health: '' });
    setRecommendation('');
  };

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
                  <View style={{ flexDirection: 'row', marginTop: 20 }}>
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Button
                      title="TAKE A TEST"
                      onPress={startTest}
                      color='#50C878'
                      style={{ alignSelf: 'center' }}
                    />
                  </View>
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
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalView}>
    {questionIndex < questions.length && (
      <>
        <Text style={styles.modalText}>{questions[questionIndex].question}</Text>
        {questions[questionIndex].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </>
    )}
    {questionIndex === questions.length && (
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{recommendation}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
</Modal>

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
    textAlign: 'center',
    fontSize: 14,
    color: '#721c24',
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
  planCard: {
    backgroundColor: '#c7d2fe',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  optionText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  resultContainer: {
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  closeButton: {
    backgroundColor: 'blue', // Example background color
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Plan;*/

//new draft here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Modal } from 'react-native-paper';
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
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category

  useEffect(() => {
    // Fetch current plan from backend or local storage
    const fetchCurrentPlan = async () => {
      // Replace with your data fetching logic
      const plan = null; // Assume no current plan
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  // Function to render each plan card item
  const renderPlanCard = ({ item }) => (
    <PlanCard name={item.name} description={item.description} />
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
    setModalVisible(true); // Show modal when "Take a Test" is pressed
  };

  // Function to handle category selection in modal
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(false); // Hide modal after category selection
    // Additional logic can be added here to navigate or perform actions based on selected category
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Active Plan</Text>
      </View>

      <View style={styles.contentContainer}>
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

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(category) => category.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose a Category</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.categoryButtonText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#50C878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customButton: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  currentPlanContainer: {
    marginBottom: 20,
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

export default Plan;*/

//new draft here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Modal } from 'react-native-paper';
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
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    // Fetch current plan from backend or local storage
    const fetchCurrentPlan = async () => {
      // Replace with your data fetching logic
      const plan = null; // Assume no current plan
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  // Function to render each plan card item
  const renderPlanCard = ({ item }) => (
    <PlanCard name={item.name} description={item.description} />
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
    setCategoryModalVisible(true); // Show category selection modal
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false); // Hide category selection modal
    setDescriptionModalVisible(true); // Show description selection modal
  };

  // Function to handle description selection
  const handleDescriptionSelect = (description) => {
    setSelectedDescription(description);
    setDescriptionModalVisible(false); // Hide description selection modal
    // Additional logic can be added here to handle the selected description
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Active Plan</Text>
      </View>

      <View style={styles.contentContainer}>
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

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(category) => category.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <Modal
        visible={categoryModalVisible}
        onDismiss={() => setCategoryModalVisible(false)}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose a Category</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.categoryButtonText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal
        visible={descriptionModalVisible}
        onDismiss={() => setDescriptionModalVisible(false)}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose an Option</Text>
          {selectedCategory &&
            selectedCategory.data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryButton}
                onPress={() => handleDescriptionSelect(item)}
              >
                <Text style={styles.categoryButtonText}>{item.description}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#50C878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customButton: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  currentPlanContainer: {
    marginBottom: 20,
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

export default Plan;*/

//new draft here 
/*import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Modal } from 'react-native-paper';
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
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);

  useEffect(() => {
    // Fetch current plan from backend or local storage
    const fetchCurrentPlan = async () => {
      // Replace with your data fetching logic
      const plan = currentPlanFromLocalStorage(); // Example function to get plan from local storage
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  // Example function to fetch current plan from local storage
  const currentPlanFromLocalStorage = () => {
    // Replace with your actual logic to fetch from local storage
    return null; // For demonstration, assuming no plan is set initially
  };

  // Function to render each plan card item
  const renderPlanCard = ({ item }) => (
    <PlanCard name={item.name} description={item.description} />
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
    setCategoryModalVisible(true); // Show category selection modal
  };

  // Function to handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false); // Hide category selection modal
    setDescriptionModalVisible(true); // Show description selection modal
  };

  // Function to handle description selection
  const handleDescriptionSelect = (description) => {
    setSelectedDescription(description);
    setDescriptionModalVisible(false); // Hide description selection modal

    // Set current plan based on selected category and description
    setCurrentPlan({
      name: description.name,
      description: description.description,
      // Add other properties as needed based on your data structure
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Active Plan</Text>
      </View>

      <View style={styles.contentContainer}>
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

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(category) => category.id}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <Modal
        visible={categoryModalVisible}
        onDismiss={() => setCategoryModalVisible(false)}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose a Category</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryButton}
              onPress={() => handleCategorySelect(category)}
            >
              <Text style={styles.categoryButtonText}>{category.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <Modal
        visible={descriptionModalVisible}
        onDismiss={() => setDescriptionModalVisible(false)}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Choose an Option</Text>
          {selectedCategory &&
            selectedCategory.data.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryButton}
                onPress={() => handleDescriptionSelect(item)}
              >
                <Text style={styles.categoryButtonText}>{item.description}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#50C878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  customButton: {
    marginHorizontal: 5,
    marginTop: 10,
  },
  currentPlanContainer: {
    marginBottom: 20,
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

export default Plan;*/

// //new draft here 
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Button, Modal } from 'react-native-paper';
// import PlanCard from '../../components/PlanCard';
// import images from '../../constants/images';

// const categories = [
//   {
//     id: '1',
//     title: 'Weight Loss',
//     data: [
//       { id: 'w1', name: 'Keto Diet', description: 'Low carb, high fat', image: images.fruit_salad },
//       { id: 'w2', name: 'Low Calorie', description: 'Reduce calorie intake', image: images.fruit_salad },
//       { id: 'w3', name: 'Intermittent Fasting', description: 'Fasting and eating periods' },
//     ],
//   },
//   {
//     id: '2',
//     title: 'Muscle Gain',
//     data: [
//       { id: 'm1', name: 'High Protein', description: 'Protein-rich meals' },
//       { id: 'm2', name: 'Bodybuilding', description: 'Structured for muscle gain' },
//       { id: 'm3', name: 'Paleo', description: 'Whole foods, lean proteins' },
//     ],
//   },
//   {
//     id: '3',
//     title: 'Maintenance',
//     data: [
//       { id: 't1', name: 'Balanced Diet', description: 'Nutrient-rich balanced meals' },
//       { id: 't2', name: 'Mediterranean', description: 'Heart-healthy foods' },
//       { id: 't3', name: 'Whole30', description: 'Whole, unprocessed foods' },
//     ],
//   },
//   {
//     id: '4',
//     title: 'Vegan',
//     data: [
//       { id: 'v1', name: 'Vegan Balanced', description: 'Complete vegan diet' },
//       { id: 'v2', name: 'Raw Vegan', description: 'Unprocessed, raw foods' },
//       { id: 'v3', name: 'High Protein Vegan', description: 'Protein-rich vegan meals' },
//     ],
//   },
// ];

// const Plan = () => {
//   const [currentPlan, setCurrentPlan] = useState(null);
//   const [categoryModalVisible, setCategoryModalVisible] = useState(false);
//   const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDescription, setSelectedDescription] = useState(null);

//   useEffect(() => {
//     // Fetch current plan from backend or local storage
//     const fetchCurrentPlan = async () => {
//       // Replace with your data fetching logic
//       const plan = currentPlanFromLocalStorage(); // Example function to get plan from local storage
//       setCurrentPlan(plan);
//     };

//     fetchCurrentPlan();
//   }, []);

//   // Example function to fetch current plan from local storage
//   const currentPlanFromLocalStorage = () => {
//     // Replace with your actual logic to fetch from local storage
//     return null; // For demonstration, assuming no plan is set initially
//   };

//   // Function to render each plan card item
//   const renderPlanCard = ({ item }) => (
//     <PlanCard name={item.name} description={item.description} />
//   );

//   // Function to render each category with its list of plans
//   const renderCategory = ({ item }) => (
//     <View style={styles.categoryContainer}>
//       <Text style={styles.categoryTitle}>{item.title}</Text>
//       <FlatList
//         data={item.data}
//         horizontal
//         renderItem={renderPlanCard}
//         keyExtractor={(plan) => plan.id}
//         contentContainerStyle={styles.planList}
//         showsHorizontalScrollIndicator={false}
//       />
//     </View>
//   );

//   // Function to handle pressing "Take a Test" button
//   const handleTakeTest = () => {
//     setCurrentPlan(null); // Reset current plan
//     setSelectedCategory(null); // Reset selected category
//     setSelectedDescription(null); // Reset selected description
//     setCategoryModalVisible(true); // Show category selection modal
//   };

//   // Function to handle category selection
//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setCategoryModalVisible(false); // Hide category selection modal
//     setDescriptionModalVisible(true); // Show description selection modal
//   };

//   // Function to handle description selection
//   const handleDescriptionSelect = (description) => {
//     setSelectedDescription(description);
//     setDescriptionModalVisible(false); // Hide description selection modal

//     // Set current plan based on selected category and description
//     setCurrentPlan({
//       name: description.name,
//       description: description.description,
//       // Add other properties as needed based on your data structure
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.pageTitle}>Active Plan</Text>
//       </View>

//       <View style={styles.contentContainer}>
//         <View style={styles.currentPlanContainer}>
//           {currentPlan ? (
//             <View style={styles.currentPlanCard}>
//               <Text style={styles.currentPlanTitle}>Current Plan</Text>
//               <Text style={styles.planTitle}>{currentPlan.name}</Text>
//               <Text style={styles.planDescription}>{currentPlan.description}</Text>
//               <Button
//                 mode="contained"
//                 style={styles.deleteButton}
//                 labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
//                 onPress={() => setCurrentPlan(null)}
//               >
//                 DELETE PLAN
//               </Button>
//             </View>
//           ) : (
//             <View style={styles.noPlanCard}>
//               <Text style={styles.noPlanText}>You are not on any plan now.</Text>
//               <Text style={styles.noPlanPrompt}>Choose a plan below or create your own custom plan.</Text>
//               <View style={styles.buttonContainer}>
//                 <Button
//                   mode="contained"
//                   style={styles.customButton}
//                   labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
//                   onPress={handleTakeTest}
//                 >
//                   TAKE A TEST
//                 </Button>
//                 <Button
//                   mode="contained"
//                   style={styles.customButton}
//                   labelStyle={{ fontSize: 15, fontWeight: 'bold' }}
//                   onPress={() => console.log('Pressed CUSTOMISE')}
//                 >
//                   CUSTOMISE
//                 </Button>
//               </View>
//             </View>
//           )}
//         </View>

//         <FlatList
//           data={categories}
//           renderItem={renderCategory}
//           keyExtractor={(category) => category.id}
//           contentContainerStyle={styles.categoryList}
//         />
//       </View>

//       {/* Modal for category selection */}
//       <Modal
//         visible={categoryModalVisible}
//         onDismiss={() => setCategoryModalVisible(false)}
//         contentContainerStyle={styles.modalContent}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Choose a Category</Text>
//           {categories.map((category) => (
//             <TouchableOpacity
//               key={category.id}
//               style={styles.categoryButton}
//               onPress={() => handleCategorySelect(category)}
//             >
//               <Text style={styles.categoryButtonText}>{category.title}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       </Modal>

//       {/* Modal for description selection */}
//       <Modal
//         visible={descriptionModalVisible}
//         onDismiss={() => setDescriptionModalVisible(false)}
//         contentContainerStyle={styles.modalContent}
//       >
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalTitle}>Choose an Option</Text>
//           {selectedCategory &&
//             selectedCategory.data.map((item) => (
//               <TouchableOpacity
//                 key={item.id}
//                 style={styles.categoryButton}
//                 onPress={() => handleDescriptionSelect(item)}
//               >
//                 <Text style={styles.categoryButtonText}>{item.description}</Text>
//               </TouchableOpacity>
//             ))}
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     backgroundColor: '#50C878',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginBottom: 10,
//   },
//   pageTitle: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   contentContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   customButton: {
//     marginHorizontal: 5,
//     marginTop: 10,
//   },
//   deleteButton: {
//     backgroundColor: '#FF6347',
//     marginTop: 10,
//   },
//   currentPlanContainer: {
//     marginBottom: 20,
//   },
//   currentPlanCard: {
//     backgroundColor: '#d3f8e2',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   currentPlanTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   planTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   planDescription: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   noPlanCard: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   noPlanText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#721c24',
//   },
//   noPlanPrompt: {
//     fontSize: 14,
//     color: '#721c24',
//     textAlign: 'center',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   categoryList: {
//     flexGrow: 1,
//   },
//   categoryContainer: {
//     marginVertical: 10,
//   },
//   categoryTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//     paddingHorizontal: 20,
//   },
//   planList: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     margin: 50,
//     borderRadius: 10,
//   },
//   modalContainer: {
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   categoryButton: {
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginVertical: 5,
//     borderRadius: 5,
//   },
//   categoryButtonText: {
//     fontSize: 16,
//   },
// });

// export default Plan;
//new draft here 
/*import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Modal } from 'react-native-paper';
import PlanCard from '../../components/PlanCard';
import images from '../../constants/images';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';

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
  {
    id: '5',
    title: 'Gluten-Free',
    data: [
      { id: 'g1', name: 'Gluten-Free Balanced', description: 'Balanced nutrition without gluten' },
      { id: 'g2', name: 'Paleo Gluten-Free', description: 'Paleo principles, gluten-free' },
      { id: 'g3', name: 'Low FODMAP', description: 'Low FODMAP foods to reduce digestive distress' },
    ],
  },
  {
    id: '6',
    title: 'Diabetic-Friendly',
    data: [
      { id: 'd1', name: 'Low Glycemic Index', description: 'Foods with a low glycemic index' },
      { id: 'd2', name: 'Mediterranean Diabetic', description: 'Mediterranean principles, diabetic-friendly' },
      { id: 'd3', name: 'Carb Counting', description: 'Manage carbohydrate intake for better blood sugar control' },
    ],
  },
  {
    id: '7',
    title: 'Heart-Healthy',
    data: [
      { id: 'h1', name: 'DASH Diet', description: 'Reduce sodium and increase nutrient-rich foods' },
      { id: 'h2', name: 'Ornish Diet', description: 'Low-fat, vegetarian diet for cardiovascular health' },
      { id: 'h3', name: 'TLC Diet', description: 'Therapeutic Lifestyle Changes to reduce cholesterol' },
    ],
  },
  {
    id: '8',
    title: 'Pregnancy and Postpartum',
    data: [
      { id: 'p1', name: 'Prenatal Nutrition', description: 'Nutritional needs during pregnancy' },
      { id: 'p2', name: 'Postpartum Recovery', description: 'Nutrient-dense foods for postpartum recovery' },
      { id: 'p3', name: 'Breastfeeding Diet', description: 'Supports lactation with essential nutrients' },
    ],
  },
];

const Plan = () => {
  const { currentPlan, setCurrentPlan } = useGlobalContext();

  useEffect(() => {
    // Fetch current plan from backend or local storage
    const fetchCurrentPlan = async () => {
      // Replace with your data fetching logic
      const plan = currentPlanFromLocalStorage(); // Example function to get plan from local storage
      setCurrentPlan(plan);
    };

    fetchCurrentPlan();
  }, []);

  // Example function to fetch current plan from local storage
  const currentPlanFromLocalStorage = () => {
    // Replace with your actual logic to fetch from local storage
    return null; // For demonstration, assuming no plan is set initially
  };

  // Function to render each plan card item
  const renderPlanCard = ({ item }) => (
    <PlanCard name={item.name} description={item.description} />
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
    router.navigate({pathname:'category', params: {categoriesList: JSON.stringify(categories)}});
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Active Plan</Text>
      </View>

      <View style={styles.contentContainer}>
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
                onPress={() => setCurrentPlan(null)}
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
  },
  headerContainer: {
    backgroundColor: '#50C878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
    marginBottom: 20,
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

export default Plan;*/

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
  {
    id: '5',
    title: 'Gluten-Free',
    data: [
      { id: 'g1', name: 'Gluten-Free Balanced', description: 'Balanced nutrition without gluten' },
      { id: 'g2', name: 'Paleo Gluten-Free', description: 'Paleo principles, gluten-free' },
      { id: 'g3', name: 'Low FODMAP', description: 'Low FODMAP foods to reduce digestive distress' },
    ],
  },
  {
    id: '6',
    title: 'Diabetic-Friendly',
    data: [
      { id: 'd1', name: 'Low Glycemic Index', description: 'Foods with a low glycemic index' },
      { id: 'd2', name: 'Mediterranean Diabetic', description: 'Mediterranean principles, diabetic-friendly' },
      { id: 'd3', name: 'Carb Counting', description: 'Manage carbohydrate intake for better blood sugar control' },
    ],
  },
  {
    id: '7',
    title: 'Heart-Healthy',
    data: [
      { id: 'h1', name: 'DASH Diet', description: 'Reduce sodium and increase nutrient-rich foods' },
      { id: 'h2', name: 'Ornish Diet', description: 'Low-fat, vegetarian diet for cardiovascular health' },
      { id: 'h3', name: 'TLC Diet', description: 'Therapeutic Lifestyle Changes to reduce cholesterol' },
    ],
  },
  {
    id: '8',
    title: 'Pregnancy and Postpartum',
    data: [
      { id: 'p1', name: 'Prenatal Nutrition', description: 'Nutritional needs during pregnancy' },
      { id: 'p2', name: 'Postpartum Recovery', description: 'Nutrient-dense foods for postpartum recovery' },
      { id: 'p3', name: 'Breastfeeding Diet', description: 'Supports lactation with essential nutrients' },
    ],
  },
];

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
    <PlanCard name={item.name} description={item.description} />
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
        <Text style={styles.pageTitle}>Active Plan</Text>
      </View>

      <View style={styles.contentContainer}>
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
  },
  headerContainer: {
    backgroundColor: '#50C878',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
    marginBottom: 20,
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

