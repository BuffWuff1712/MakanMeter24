import { Ionicons } from '@expo/vector-icons'
import { router, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { TouchableOpacity } from 'react-native'

const PlanLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="category"
          options={{
            headerShown: false,
          }}
        />
        
        <Stack.Screen 
          name="options"
          options={{
            headerShown: false
          }}
        /> 

        <Stack.Screen 
          name="plan_info"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  )
}

export default PlanLayout