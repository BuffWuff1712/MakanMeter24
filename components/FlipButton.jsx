import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '../constants';

const FlipButton = ({ handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      testID="flipButton"
    >
      <Image 
        source={icons.flip}
        resizeMode="contain"
        style={{ width: 50, height: 50 }}
        testID="flipButtonImage"
      />
    </TouchableOpacity>
  );
};

export default FlipButton;
