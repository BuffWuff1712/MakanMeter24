import { View, Text } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { TrackedMealsProvider } from '../../context/TrackedMealsContext'

const CamLayout = () => {
  return (
    <>
    <TrackedMealsProvider>
      <Stack>
        <Stack.Screen 
            name="log_page"
            options={{
              headerShown: false,
            }}
        />
        
        <Stack.Screen 
          name="camera"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen 
          name="results"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </TrackedMealsProvider>
    </>
  )
}

export default CamLayout