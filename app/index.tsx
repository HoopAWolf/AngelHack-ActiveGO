// App.tsx
import { AppRegistry } from 'react-native';
import { BottomNavigation, MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { expo as expo } from '../app.json';
import LoginScreen from './login';
import React from 'react';
import HomeScreen from './tabs/home';
import ScanScreen from './tabs/scan';
import ExploreScreen from './tabs/explore';
import SocialScreen from './tabs/social';
import EventScreen from './tabs/events';

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
    { key: 'scan', title: 'Scan', unfocusedIcon: 'qrcode-scan', focusedIcon: 'qrcode-scan' },
    { key: 'explore', title: 'Explore', unfocusedIcon: 'map-marker', focusedIcon: 'map-marker' },
    { key: 'social', title: 'Social', unfocusedIcon: 'account-multiple', focusedIcon: 'account-multiple' },
    { key: 'events', title: 'Events', unfocusedIcon: 'apps', focusedIcon: 'apps' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeScreen,
    scan: ScanScreen,
    explore: ExploreScreen,
    social: SocialScreen,
    events: EventScreen,
  });

  return (
    <PaperProvider theme={theme} >
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </PaperProvider >
  );
};

AppRegistry.registerComponent(expo.name, () => App);

export default App;



