import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Modal, Pressable, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useGlobalContext } from '../context/GlobalProvider';
import { useAddFoodButton } from '../context/AddFoodButtonContext';
import { useRouter } from 'expo-router';
import { getDate }  from '../lib/supabase'

const AddFoodButton = ({ onPress }) => {
  const { selectedDate, setSelectedDate } = useGlobalContext();
  const { handlePress1, buttonSize, rotation, handlePress2 } = useAddFoodButton();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const combinedPressHandler = () => {
    setModalVisible(true);
    handlePress1();
    if (onPress) {
      onPress();
    }
  };

  const closedPressHandler = () => {
    setModalVisible(false);
    handlePress2();
    router.back();
  };

  const handleMealPress = (mealType) => {
    router.navigate({
      pathname: 'log_page',
      params: { meal_type: mealType , date: getDate(selectedDate)},
    });
    setModalVisible(false);
    handlePress2();
  };

  const sizeStyle = {
    transform: [{ scale: buttonSize }],
  };

  const rotationStyle = {
    transform: [{
      rotate: rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '45deg']
      })
    }]
  };

  return (
    <>
      <TouchableOpacity
        style={{ justifyContent: 'center', alignItems: 'center', top: -15 }}
        activeOpacity={0.9}
        onPress={combinedPressHandler}
      >
        <View className="w-[70px] h-[70px] rounded-full shadow-lg justify-center items-center">
          <Animated.View style={[styles.button, sizeStyle]}>
            <Animated.View style={rotationStyle}>
              <FontAwesome5 name="plus" size={24} color="#FFF" />
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => closedPressHandler()}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => closedPressHandler()}
        >
          <View style={styles.modalView}>
            <View style={styles.options}>
              {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((mealType) => (
                <Pressable
                  key={mealType}
                  style={styles.optionButton}
                  onPress={() => handleMealPress(mealType)}
                >
                  <Text style={styles.optionText}>{mealType}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#36B37E',
    position: 'absolute',
    marginTop: -60,
    shadowColor: '#36B37E',
    shadowRadius: 5,
    shadowOffset: { height: 10 },
    shadowOpacity: 0.3,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    elevation: 2,
  },
  optionText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AddFoodButton;
