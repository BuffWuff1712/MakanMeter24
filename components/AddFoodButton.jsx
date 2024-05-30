import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAddFoodButton } from '../context/AddFoodButtonContext';

const AddFoodButton = ({ onPress }) => {
  const { handlePress1, buttonSize, rotation } = useAddFoodButton();

  const combinedPressHandler = () => {
    handlePress1();
    if (onPress) {
      onPress();
    }
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
  );
};


const styles = StyleSheet.create({
  button: {
      alignItems: "center",
      justifyContent: "center",
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: "#36B37E",
      position: "absolute",
      marginTop: -60,
      shadowColor: "#36B37E",
      shadowRadius: 5,
      shadowOffset: { height: 10 },
      shadowOpacity: 0.3,
      borderWidth: 3,
      borderColor: "#FFFFFF"
  },
  secondaryButton: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#7F58FF"
  }
});

export default AddFoodButton;
