import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const NutrientsProgressBar = ({config}) => {
    const { color, nutrientType, consumed, total} = config;
    return (
        nutrientType ==='Daily Intake' ?
    <View className=''>
        <View className='flex-row justify-between mb-2'>
            <Text className='font-bold'>{nutrientType}</Text>
            <Text className=''>{consumed} / {total} cal</Text>
        </View>
        
        <Progress.Bar progress={consumed/total} height={10} width={350} 
          color={color} unfilledColor='whitesmoke' 
          borderColor='whitesmoke' borderRadius={30} 
          animated={true} />
    </View> 
    :
    <View className='justify-center items-center'>
        <Text className=''>{nutrientType}</Text>
        <Progress.Bar progress={consumed/total} height={5} width={80} 
          color={color} unfilledColor='whitesmoke' 
          borderColor='whitesmoke' borderRadius={30} 
          animated={true} />
        <Text className='text-xs'>{consumed} / {total}g</Text>
    </View> 
  )
}

export default NutrientsProgressBar
