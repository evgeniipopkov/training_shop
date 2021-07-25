import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import StateProvider from './src/context/State';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <StateProvider>
      <AppNavigator />
    </StateProvider>
  );
};

export default App;
