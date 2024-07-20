import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

const ZoomSlider = ({func}) => {
  return (
    <View className='flex-row justify-center items-center'>
        <Entypo name="minus" size={30} color="white" style={{transform: [{ rotate: '90deg' }],}} />
        <Slider
            style={{ width: 325 , marginHorizontal: 5,}}
            minimumValue={0}
            maximumValue={0.05}
            step={0.0001}
            onValueChange={func}
            minimumTrackTintColor="#10b981"
            maximumTrackTintColor="#CDCDE0"
        />
        <Entypo name="plus" size={30} color="white" />
    </View>
  )
}

export default ZoomSlider

const styles = StyleSheet.create({})