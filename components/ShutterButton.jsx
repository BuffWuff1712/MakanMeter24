import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { icons } from '../constants';

const ShutterButton = ({handlePress}) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
    >
        <Image 
            source={icons.shutter}
            resizeMode='contain'
            className="w-[90px] h-[90px]"
        />

    </TouchableOpacity>
  )
}

export default ShutterButton
