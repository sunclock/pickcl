import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { TabNavigator } from './RootNavigator';
import { SignInAnonymous, SignInRealName, SignOutAccount } from '../reducers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../styles/Colors';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import RNPermissions, {
	PERMISSIONS,
} from 'react-native-permissions';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Track from '../templates/track.template';
import Auth from '../templates/auth.template';
import SignIn from '../templates/signin.template';
import SignUp from '../templates/signup.template';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

type DrawerParamList = {
	TrackList: undefined;
	AuthStack: undefined;
	Track: undefined;
}

type StackParamList = {
	Auth: undefined;
	SignIn: undefined;
	SignUp: undefined;
	SignOut: undefined;
}

export type SignOutScreenProp = NativeStackNavigationProp<StackParamList, 'SignOut'>;

export type AuthScreenProp = CompositeNavigationProp<
	DrawerNavigationProp<DrawerParamList, 'AuthStack'>,
	NativeStackNavigationProp<StackParamList>
>;

export type AuthScreenRouteProp = RouteProp<StackParamList, 'Auth'>;

const Drawer = createDrawerNavigator();

const AuthStack = createNativeStackNavigator();

export const AuthStackNavigator = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name='Auth' component={Auth} />
			<AuthStack.Screen name="SignUp" component={SignUp} />
			<AuthStack.Screen name="SignIn" component={SignIn} />
		</AuthStack.Navigator>
	);
};

export const AppNavigator = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const user = useSelector((state: any) => state.auth.user);
	const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	// Set an initializing state whilst Firebase connects
	const [isReady, setIsReady] = useState(false);
	const login = async (user) => {
		if (isLoggedIn)
			return;
		if (!user) {
			dispatch(SignInAnonymous());
			return;
		}
		if (!user.isAnonymous)
			dispatch(SignInRealName(user as FirebaseAuthTypes.User));
	};
	// Handle user state changes
	function onAuthStateChanged(user) {
		login(user);
		if (!isReady) setIsReady(true);
	}

	useEffect(() => {
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		login(user);
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
					if (state && !state.isAnnonymous) {
						dispatch(SignInRealName(user as FirebaseAuthTypes.User));
					} else {
						dispatch(SignInAnonymous());
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

	if (!isReady) return null;

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			initialRouteName={user ? 'TrackList' : 'Auth'}
			screenOptions={({ route }) => ({
				drawerActiveBackgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
				drawerActiveTintColor: isDarkMode ? Colors.dark.primary : Colors.primary,
				headerTintColor: isDarkMode ? Colors.dark.primary : Colors.primary,
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				headerShown: false,
				drawerIcon: ({ focused }) => {
					let iconName;
					const color = focused ? Colors.primary : isDarkMode ? Colors.dark.primary : Colors.primary;
					if (route.name == 'TrackList')
						if (focused) iconName = 'ios-list-sharp';
						else iconName = 'ios-list-outline';
					return <Ionicons name={iconName} size={25} color={color} />;
				}
			})}
		>
			<Drawer.Screen name="TrackList" component={TabNavigator}
				options={{
					title: '재생 목록'
				}}
			/>
			<Drawer.Screen name="AuthStack" component={AuthStackNavigator}
				options={{
					drawerItemStyle: {
						display: 'none'
					}
				}}
			/>
			<Drawer.Screen name="Track" component={Track}
				options={{
					drawerItemStyle: {
						display: 'none'
					}
				}} />
		</Drawer.Navigator>
	);
};

function CustomDrawerContent(props) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			{isLoggedIn ?
				(
					<DrawerItem
						label='로그아웃'
						onPress={() => {
							Alert.alert('로그아웃', '로그아웃 하시겠습니까?', [
								{
									text: '취소',
									onPress: () => { },
									style: 'cancel'
								},
								{
									text: '로그아웃',
									onPress: () => {
										dispatch(SignOutAccount())
										props.navigation.navigate('AuthStack');
									}
								}
							], { cancelable: false })
						}}
						icon={({ color, size }) => (
							<Ionicons name='ios-log-out' size={size} color={color} />
						)}
					/>
				) : (
					<DrawerItem
						label="로그인"
						onPress={() => { props.navigation.navigate('AuthStack') }}
						icon={() => <Ionicons name="ios-log-in" size={25} color={Colors.primary} />}
					/>
				)
			}
		</DrawerContentScrollView>
	)
}