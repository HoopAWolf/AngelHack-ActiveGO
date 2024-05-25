
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native'

export default function RootLayout() {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}
    >
      <Stack screenOptions={{ headerShown: false }} >
      </Stack>
    </SafeAreaView>
  )
}