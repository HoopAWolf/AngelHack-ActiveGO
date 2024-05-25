// navigation.d.ts
import { StackNavigationProp } from '@react-navigation/stack';

// Define the param list for the stack navigator
export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

// Define the navigation prop for the Login screen
export type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

// Define the navigation prop for the Home screen
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;
