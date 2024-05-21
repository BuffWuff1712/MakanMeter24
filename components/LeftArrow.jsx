import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../constants';

const LeftArrow = ({handlePress}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
    >
        <Image 
            source={icons.leftArrow}
            resizeMode='contain'
            className="mb-5 w-[70px] h-[30px]"
        />
    </TouchableOpacity>
  )
}

export default LeftArrow
