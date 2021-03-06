import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { TabNavigator } from './RootNavigator';
import { SignInRealName, SignOutAccount } from '../reducers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../styles/Colors';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import auth from '@react-native-firebase/auth';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Track from '../templates/track.template';
import Auth from '../templates/auth.template';
import SignIn from '../templates/signin.template';
import SignUp from '../templates/signup.template';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar } from 'native-base';
import Home from '../templates/home.template';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TrackList from '../templates/new.tracklist.template';
import Drama from '../templates/drama.template';
import File from '../templates/file.template';

type DrawerParamList = {
	TrackList: undefined;
	AuthStack: undefined;
	HomeStack: undefined;
	Track: undefined;
}

type AuthStackParamList = {
	Auth: undefined;
	SignIn: undefined;
	SignUp: undefined;
	SignOut: undefined;
}

type HomeStackParamList = {
	Home: undefined;
	TrackList: undefined;
	Drama: undefined;
	File: undefined;
	Track: undefined;
}

export type SignOutScreenProp = NativeStackNavigationProp<AuthStackParamList, 'SignOut'>;
export type AuthScreenProp = CompositeNavigationProp<
	DrawerNavigationProp<DrawerParamList, 'AuthStack'>,
	NativeStackNavigationProp<AuthStackParamList>
>;
export type HomeScreenProp = CompositeNavigationProp<
	DrawerNavigationProp<DrawerParamList, 'HomeStack'>,
	NativeStackNavigationProp<HomeStackParamList>
>;
export type TrackListScreenProp = NativeStackNavigationProp<HomeStackParamList, 'TrackList'>;
export type DramaScreenProp = NativeStackNavigationProp<HomeStackParamList, 'Drama'>;
export type FileScreenProp = NativeStackNavigationProp<HomeStackParamList, 'File'>;
export type TrackScreenProp = CompositeNavigationProp<
	DrawerNavigationProp<DrawerParamList, 'Track'>,
	NativeStackNavigationProp<HomeStackParamList>
>;
export type AuthScreenRouteProp = RouteProp<AuthStackParamList, 'Auth'>;

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

const HomeStack = createNativeStackNavigator();

export const HomeStackNavigator = () => {
	return (
		<HomeStack.Navigator screenOptions={{ headerShown: false }}>
			<HomeStack.Screen name='Home' component={Home} />
			<HomeStack.Screen name="TrackList" component={TrackList} />
			<HomeStack.Screen name="Drama" component={Drama} />
			<HomeStack.Screen name="File" component={File} />
		</HomeStack.Navigator>
	)
}

export const AppNavigator = () => {
	const isDarkMode = useColorScheme() === 'dark';
	const [initializing, setInitializing] = useState(true); // Set an initializing state whilst Firebase connects
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	const labelStyle = { color: isDarkMode ? Colors.dark.primaryText : Colors.primaryText, fontSize: 16 }

	useEffect(() => {
		function onAuthStateChanged(user) {
			if (user) dispatch(SignInRealName(user));
			if (initializing) setInitializing(false);
		}
		async function isFirstOpen() {
			await AsyncStorage.getItem('isFirstOpen').then(value => {
				if (value === null) {
					AsyncStorage.setItem('isFirstOpen', 'false');
				}
			})
			SplashScreen.hide();
		}
		isFirstOpen();
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		return subscriber; // unsubscribe on unmount
	}, []);
	if (initializing) return null;

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			initialRouteName={user ? 'HomeStack' : 'AuthStack'}
			screenOptions={({ route }) => ({
				drawerStyle: {
					backgroundColor: isDarkMode ? Colors.dark.hover : Colors.background,
				},
				drawerActiveBackgroundColor: isDarkMode ? Colors.dark.hover : Colors.background,
				drawerActiveTintColor: isDarkMode ? Colors.dark.primaryText : Colors.primaryText,
				drawerInactiveTintColor: isDarkMode ? Colors.dark.primaryText : Colors.primaryText,
				drawerInactiveBackgroundColor: isDarkMode ? Colors.dark.hover : Colors.background,
				headerShown: false,
				drawerIcon: ({ focused }) => {
					let iconName;
					const color = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
					if (route.name == 'OldTrackList')
						if (focused) iconName = 'playlist-music';
						else iconName = 'playlist-music-outline';
					if (route.name == 'HomeStack')
						if (focused) iconName = 'home';
						else iconName = 'home-outline';
					return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
				}
			})}
		>
			<Drawer.Screen name="HomeStack" component={Home}
				options={{
					title: '???',
					drawerLabelStyle: labelStyle
				}}
			/>
			<Drawer.Screen name="OldTrackList" component={TabNavigator}
				options={{
					title: '?????? ??????',
					drawerLabelStyle: labelStyle
				}}
			/>
			<Drawer.Screen name="TrackList" component={TrackList} options={{ drawerItemStyle: { display: 'none' } }} />
			<Drawer.Screen name="Drama" component={Drama} options={{ drawerItemStyle: { display: 'none' } }} />
			<Drawer.Screen name="File" component={File} options={{ drawerItemStyle: { display: 'none' } }} />
			<Drawer.Screen name="AuthStack" component={AuthStackNavigator} options={{ drawerItemStyle: { display: 'none' } }} />
			<Drawer.Screen name="Track" component={Track} options={{ drawerItemStyle: { display: 'none' } }} />
		</Drawer.Navigator>
	);
};

function CustomDrawerContent(props) {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
	const user = useSelector((state) => state.auth.user);
	const isDarkMode = useColorScheme() === 'dark';
	const label = isLoggedIn ?
		user.displayName ?
			user.displayName :
			user.email :
		'?????????';
	const labelStyle = { color: isDarkMode ? Colors.dark.primaryText : Colors.primaryText, fontSize: 16 }
	const iconColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	return (
		<DrawerContentScrollView {...props} contentContainerStyle={
			{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }
		}>
			{isLoggedIn ?
				(
					<>
						<View>
							<DrawerItem
								label={label}
								labelStyle={labelStyle}
								onPress={() => props.navigation.closeDrawer()}
								icon={() =>
									<Avatar size={50}
										bg={isDarkMode ? Colors.dark.primary : Colors.primary}
										source={{
											uri: user?.photoURL
										}}></Avatar>}
							/>
							<DrawerItemList {...props} />
						</View>
						<View style={{ marginBottom: 40 }}>
							<DrawerItem
								label='????????????'
								labelStyle={labelStyle}
								onPress={() => {
									Alert.alert('????????????', '???????????? ???????????????????', [
										{
											text: '??????',
											onPress: () => { },
											style: 'cancel'
										},
										{
											text: '????????????',
											onPress: () => {
												dispatch(SignOutAccount())
												props.navigation.reset({
													index: 0,
													routes: [{ name: 'AuthStack' }],
												});
											}
										}
									], { cancelable: false })
								}}
								icon={() => <Ionicons name={'ios-log-out-outline'} size={25} color={iconColor} />}
							/>
						</View>
					</>
				) : (
					<>
						<View>
							<DrawerItemList {...props} />
						</View>
						<View style={{ marginBottom: 40 }}>
							<DrawerItem
								label="?????????"
								labelStyle={labelStyle}
								onPress={() => {
									props.navigation.reset({
										index: 0,
										routes: [{ name: 'AuthStack' }],
									});
								}}
								icon={() => <Ionicons name={'ios-log-in'} size={25} color={iconColor} />}
							/>
						</View>
					</>
				)
			}
		</DrawerContentScrollView>
	)
}