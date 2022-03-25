import React, { useEffect, useState } from 'react';
import { Linking, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { rootReducer } from './src/reducers';
import SplashScreen from 'react-native-splash-screen'
import { NativeBaseProvider } from 'native-base';
import { RootNavigator } from './src/navigation/RootNavigator';
import RNPermissions, {
  PERMISSIONS,
} from 'react-native-permissions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>()

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (!isReady) setIsReady(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    SplashScreen.hide();
    RNPermissions.request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem('user');
          const state = savedStateString ? JSON.parse(savedStateString) : user;

          if (state !== undefined) {
            setUser(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  // auth()
  //   .signInAnonymously()
  //   .then(() => {
  //     console.log('User signed in anonymously');
  //   })
  //   .catch(error => {
  //     if (error.code === 'auth/operation-not-allowed') {
  //       console.log('Enable anonymous in your firebase console.');
  //     }
  //     console.error(error);
  //   });

  if (!isReady) return null;

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootNavigator user={user} />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
