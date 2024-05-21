import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../constants';

const FlipButton = ({handlePress}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
    >
        <Image 
            source={icons.flip}
            resizeMode='contain'
            className="left-5 w-[70px] h-[50px]"
        />
    </TouchableOpacity>
  )
}

export default FlipButton
