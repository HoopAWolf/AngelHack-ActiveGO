import { Image, StyleSheet, Platform } from 'react-native';
import '@tamagui/core/reset.css';
import { TamaguiProvider, View, createTamagui } from '@tamagui/core';
import { Button } from 'tamagui';
import { config } from '@tamagui/config/v3'

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const tamaguiConfig = createTamagui(config)

type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

export default function LoginScreen() {
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
                <ThemedText type="title">LOGIN PAGE!</ThemedText>
                <Button theme="red">Click Here to LOG YO ASS IN</Button>
            </ThemedView>

            </ParallaxScrollView>
        </TamaguiProvider>
    );
}

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