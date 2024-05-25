import 'react-native-gesture-handler'; // MUST BE AT THE TOP OF INDEX!!!!!!!!!!!!!!!!!!!!!!!!!
import * as React from 'react';
import { StyleSheet, View } from 'react-native';

const LoginScreen: React.FC = () => {
  return (
    <View>
      Login Page
    </View>
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