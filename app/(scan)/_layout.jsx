import { Stack } from 'expo-router'

const CamLayout = () => {
  return (
    <>
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
          name="barcodeScanner"
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
    </>
  )
}

export default CamLayout