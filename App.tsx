import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { rootReducer } from './src/reducers';
import SplashScreen from 'react-native-splash-screen'
import { extendTheme, NativeBaseProvider } from 'native-base';
import { RootNavigator } from './src/navigation/RootNavigator';
import RNPermissions, {
  PERMISSIONS,
} from 'react-native-permissions';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
    RNPermissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
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
