import { View, Text, FlatList, Image, RefreshControlBase, RefreshControl, Alert, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import{ icons } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { Link } from 'expo-router'
import DatePicker from '../../components/DatePicker'


const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        {/* Top layer icons */}
        <View className="flex flex-row justify-center items-center space-x-20 
        w-full bg-gray mb-5">
          <Image 
            source={icons.fire}
            resizeMode='contain'
            className="w-[40px] h-[40px]"
          />
          <Image 
            source={icons.logoSmall}
            resizeMode='contain'
            className="w-[55px] h-[55px]"
          />
          <Image 
            source={icons.bell}
            resizeMode='contain'
            className="w-[40px] h-[40px]"
          />
        </View>

        <View className="w-full bg-white items-center">
          <DatePicker/>
        </View>

        <View className="w-full bg-white items-center">
          <Text>Calories and Macros chart goes here</Text>
        </View>

        <View className="w-full justify-center min-h-[83vh] 
        px-4 my-6">
          <Link href="../(scan)/camera">Press here for camera</Link>
        </View>

        <View className="w-full bg-white items-center">
          <Text>List of items eaten goes here</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Home