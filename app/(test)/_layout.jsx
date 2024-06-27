import { Slot, Stack } from 'expo-router';

const TestLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="TestScreen" options={{ title: 'Take a Test' }} />
      <Stack.Screen name="RecommendationScreen" options={{ title: 'Recommendations' }} />
    </Stack>
  );
};

export default TestLayout;

