import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserSearch from '../../components/UserSearch'
import { searchUsernames } from '../../lib/supabase'
import { router } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { useGlobalContext } from '../../context/GlobalProvider'

const userSearchPage = () => {
    const { user } = useGlobalContext();

    const handleUserClick = async (userID) => {
        if (user !== userID) {
            router.navigate(
                {pathname: 'userProfile',
                params: { friendID: userID }})
        } else {
            router.navigate('more');
        }
    };
    
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                        <FontAwesome5 name="arrow-left" size={24} color="black" />
                    </TouchableOpacity>
                        <Text style={styles.title}>Search People</Text>
                    <View style={{ width: 24 }} />
                </View>
                <UserSearch searchFunction={searchUsernames} onUserClick={handleUserClick} />
            </View>
        </SafeAreaView>
    )
}

export default userSearchPage

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      paddingHorizontal: 10,
    },
    header: {
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
});