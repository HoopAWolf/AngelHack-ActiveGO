import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { Button, Icon, IconButton, Text } from 'react-native-paper';


const LoginScreen = (props: any) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImg}
        source={require('../assets/images/login-bg.jpg')}
      >
        <Text variant='displayLarge' theme={{ colors: { onSurface: 'white' } }}>ActiveGO</Text>
        <Text variant='bodyLarge' theme={{ colors: { onSurface: 'white' } }}>Get active, meet friends and earn points!</Text>
        <Text variant='bodyMedium' theme={{ colors: { onSurface: 'white' } }} style={styles.singInWith}>Sign in with:</Text>
        <View style={styles.buttonContainer}>
          <IconButton
            icon={() => <View style={{ marginTop: -18 }}><Icon
              source={require('../assets/images/singpass-logo.png')}
              size={128}
            /></View>}
            mode='contained' style={styles.singPassButton} onPress={() => navigation.navigate('Singpass')}>
          </IconButton>
          <Text theme={{ colors: { onSurface: 'white' } }}>OR</Text>
          <Button mode='contained-tonal' style={styles.healthy365Button} onPress={() => { }}>
            <Text variant='titleLarge'>Healthy365</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
  },
  backgroundImg: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  singInWith: {
    marginTop: 40,
  },
  singPassButton: {
    width: 266,
    height: 62,
  },
  healthy365Button: {
    width: 266,
    height: 62,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 14,
    display: 'flex',
    alignItems: "center",
    gap: 12,
  }
});