import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const InitLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="gender"
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen 
          name="age"
          options={{
            headerShown: false
          }}
        /> 

        <Stack.Screen 
          name="height"
          options={{
            headerShown: false
          }}
        />  

        <Stack.Screen 
          name="weight"
          options={{
            headerShown: false
          }}
        /> 

        <Stack.Screen 
          name="setGoals"
          options={{
            headerShown: false
          }}
        /> 
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  )
}

export default InitLayout