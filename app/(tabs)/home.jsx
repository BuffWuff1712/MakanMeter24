import { View, Text, FlatList, Image, RefreshControlBase, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import{ images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppWrite'


const Home = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      
    </SafeAreaView>
  )
}

export default Home