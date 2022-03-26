import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { rootReducer } from './src/reducers';
import { AppNavigator } from './src/navigation/AppNavigator';
import RNPermissions, {
  PERMISSIONS,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const App = () => {
  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
      RNPermissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    }
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(`${remoteMessage.notification.title}`, remoteMessage.notification.body, [
        {
          text: '좋아요!',
        },
      ])
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
