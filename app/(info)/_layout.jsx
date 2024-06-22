import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const FoodInfoLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="food_info"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  )
}

export default FoodInfoLayout