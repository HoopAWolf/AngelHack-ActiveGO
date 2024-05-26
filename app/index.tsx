// App.tsx
import { BottomNavigation, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import LoginScreen from './login';
import HomeScreen from './tabs/home';
import ExploreScreen from './tabs/explore';
import EventScreen from './tabs/events';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SingpassScreen from './singpass';
import React from 'react';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

const App = () => {

  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'home', title: 'Home', unfocusedIcon: 'home-outline', focusedIcon: 'home' },
    { key: 'explore', title: 'Explore', unfocusedIcon: 'map-marker', focusedIcon: 'map-marker' },
    { key: 'events', title: 'Events', unfocusedIcon: 'apps', focusedIcon: 'apps' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    explore: ExploreScreen,
    events: EventScreen,
  });

  const RenderHome = () => {
    return <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  }

  const Stack = createStackNavigator();

  return (
    <PaperProvider theme={theme} >
      <NavigationContainer independent>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login' >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Singpass" component={SingpassScreen} />
          <Stack.Screen name="Home" component={RenderHome} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider >
  );
};

export default App;



