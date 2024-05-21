import { View, Text, FlatList, Image, RefreshControlBase, RefreshControl, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import{ images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { Link } from 'expo-router'


const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] 
        px-4 my-6">
          <Link href="../(scan)/camera">Press here for camera</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home