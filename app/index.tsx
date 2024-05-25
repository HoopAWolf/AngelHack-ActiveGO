// App.tsx
import { BottomNavigation, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import LoginScreen from './login';
import HomeScreen from './tabs/home';
import ScanScreen from './tabs/scan';
import ExploreScreen from './tabs/explore';
import SocialScreen from './tabs/social';
import EventScreen from './tabs/events';
import React = require('react');
import { ToastAndroid } from 'react-native';

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
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

  return (
    <PaperProvider theme={theme} >
      {isLoggedIn ? <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      /> : <LoginScreen onLoginPressed={() => setIsLoggedIn(true)} />}
    </PaperProvider >
  );
};

export default App;



