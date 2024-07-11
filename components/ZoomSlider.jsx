import { View } from 'react-native'
import React from 'react'
import { Entypo } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

const ZoomSlider = ({ func }) => {
  return (
    <View className='flex-row justify-center items-center'>
      <Entypo
        name="minus"
        size={30}
        color="white"
        style={{ transform: [{ rotate: '90deg' }] }}
        testID="zoomSliderMinus"
      />
      <Slider
        style={{ width: 325, marginHorizontal: 5 }}
        minimumValue={0}
        maximumValue={0.05}
        step={0.0001}
        onValueChange={func}
        minimumTrackTintColor="#10b981"
        maximumTrackTintColor="#CDCDE0"
        testID="zoomSliderSlider"
      />
      <Entypo
        name="plus"
        size={30}
        color="white"
        testID="zoomSliderPlus"
      />
    </View>
  )
}

export default ZoomSlider
