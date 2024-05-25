import 'react-native-gesture-handler'; // MUST BE AT THE TOP OF INDEX!!!!!!!!!!!!!!!!!!!!!!!!!
import * as React from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import '@tamagui/core/reset.css';
import { TamaguiProvider, View, createTamagui } from '@tamagui/core';
import { Button } from 'tamagui';
import { config } from '@tamagui/config/v3'
const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

import { LoginScreenNavigationProp } from './navigate';
import StackNavigator from './stack-navigator';
type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">ActiveGO!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <Button theme="blue" onPress={() => navigation.navigate('Home')}>Click Here to LOGIN</Button>
        </ThemedView>
        </ParallaxScrollView>
    </TamaguiProvider>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});