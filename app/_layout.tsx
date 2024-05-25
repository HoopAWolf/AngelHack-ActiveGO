
import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    // add this
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name="App" options={{ headerShown: false }} />
    </Stack>
  )
}