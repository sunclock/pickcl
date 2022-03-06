import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BackHandler, Alert } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { rootReducer } from './src/reducers';
import SplashScreen from 'react-native-splash-screen'
import { NativeBaseProvider } from 'native-base';
import { RootNavigator } from './src/navigation/RootNavigator';
import TrackPlayer from 'react-native-track-player';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
