import React, { createContext, useContext, useRef, useState } from 'react';
import { Animated } from 'react-native';

const AddFoodButtonContext = createContext();

export const AddFoodButtonProvider = ({ children }) => {
  const buttonSize = useRef(new Animated.Value(1)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const handlePress1 = () => {
    Animated.sequence([
      Animated.timing(buttonSize, {
        toValue: 0.95,
        duration: 20,
        useNativeDriver: true
      }),
      Animated.timing(buttonSize, {
        toValue: 1,
        duration: 20,
        useNativeDriver: true
      }),
      Animated.timing(rotation, {
        toValue: rotation._value === 0 ? 1 : 0,
        duration: 100,
        useNativeDriver: true
      })
    ]).start();
  };

  const handlePress2 = () => {
    // Check the current value of rotation
    const currentRotationValue = rotation.__getValue();
    // If the current value of rotation is not 0, execute the animation
    if (currentRotationValue !== 0) {
      Animated.sequence([
        Animated.timing(buttonSize, {
          toValue: 0.95,
          duration: 20,
          useNativeDriver: true
        }),
        Animated.timing(buttonSize, {
          toValue: 1,
          duration: 20,
          useNativeDriver: true
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true
        })
      ]).start();
    };
  }

  const contextValue = {
    handlePress1,
    handlePress2,
    buttonSize,
    rotation,
  };



  return (
    <AddFoodButtonContext.Provider value={contextValue}>
      {children}
    </AddFoodButtonContext.Provider>
  );
};

export const useAddFoodButton = () => useContext(AddFoodButtonContext);
