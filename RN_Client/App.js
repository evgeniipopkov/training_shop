import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './src/navigation/AppNavigator';
import State from './src/context/State';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <State>
      <AppNavigator />
    </State>
  );
};

export default App;
