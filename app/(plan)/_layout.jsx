import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

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
      </Stack>

      <StatusBar backgroundColor="#161622" style="dark" />
    </>
  )
}

export default PlanLayout