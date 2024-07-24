import { FontAwesome5 } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'

const MoreLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
            name="userSearchPage"
            options={{
              headerShown: false,
            }}
        />
        <Stack.Screen 
            name="userProfile"
            options={{
              title: 'Profile',
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                    <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
        />
        <Stack.Screen 
            name="userFriendPage"
            options={{
              title: 'Friends',
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
                    <FontAwesome5 name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
              ),
            }}
        />
      </Stack>
    </>
  )
}

export default MoreLayout