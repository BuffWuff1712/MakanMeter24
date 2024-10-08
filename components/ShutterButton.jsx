import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '../constants';

const ShutterButton = ({ handlePress }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      testID="shutterButton"
    >
      <Image 
        source={icons.shutter}
        resizeMode="contain"
        style={{ width: 80, height: 80 }}
        testID="shutterImage"
      />
    </TouchableOpacity>
  );
}

export default ShutterButton;
