import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { TabNavigator } from './RootNavigator';
import { SignInRealName, SignOutAccount } from '../reducers/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../styles/Colors';
import { useColorScheme } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Track from '../templates/track.template';
import Auth from '../templates/auth.template';
import SignIn from '../templates/signin.template';
import SignUp from '../templates/signup.template';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Avatar, Divider } from 'native-base';
import Home from '../templates/home.template';

type DrawerParamList = {
	TrackList: undefined;
	AuthStack: undefined;
	Track: undefined;
	Home: undefined;
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

export type HomeScreenProp = DrawerNavigationProp<DrawerParamList, 'Home'>;

export type AuthScreenRouteProp = RouteProp<StackParamList, 'Auth'>;

export type HomeScreenRouteProp = RouteProp<DrawerParamList, 'Home'>;

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
	const [initializing, setInitializing] = useState(true); // Set an initializing state whilst Firebase connects
	const user = useSelector(state => state.auth.user);
	const dispatch = useDispatch();
	useEffect(() => {
		function onAuthStateChanged(user) {
			if (user) dispatch(SignInRealName(user));
			if (initializing) setInitializing(false);
		}
		const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
		SplashScreen.hide();
		return subscriber; // unsubscribe on unmount
	}, []);
	if (initializing) return null;

	return (
		<Drawer.Navigator
			drawerContent={(props) => <CustomDrawerContent {...props} />}
			initialRouteName={user ? 'Home' : 'AuthStack'}
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
						if (focused) iconName = 'playlist-music';
						else iconName = 'playlist-music-outline';
					if (route.name == 'Home')
						if (focused) iconName = 'home';
						else iconName = 'home-outline';
					return <MaterialCommunityIcons name={iconName} size={25} color={color} />;
				}
			})}
		>
			<Drawer.Screen name="Home" component={Home}
				options={{
					title: '홈',
					drawerLabelStyle: {
						fontSize: 16,
					}
				}}
			/>
			<Drawer.Screen name="TrackList" component={TabNavigator}
				options={{
					title: '재생 목록',
					drawerLabelStyle: {
						fontSize: 16,
					}
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
	const user = useSelector((state) => state.auth.user);
	const isDarkMode = useColorScheme() === 'dark';
	const label = isLoggedIn ?
		user.displayName ?
			user.displayName :
			user.email :
		'로그인';
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
								labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
								onPress={() => props.navigation.closeDrawer()}
								icon={() =>
									<Avatar size={50}
										bg={isDarkMode ? Colors.dark.primary : Colors.primary}
										source={{
											uri: user?.photoURL
										}}></Avatar>}
							/>
							<Divider />
							<DrawerItemList {...props} />
						</View>
						<View style={{ marginBottom: 40 }}>
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
												props.navigation.reset({
													index: 0,
													routes: [{ name: 'AuthStack' }],
												});
											}
										}
									], { cancelable: false })
								}}
								icon={({ color, size }) => (
									<Ionicons name='ios-log-out' size={size} color={color} />
								)}
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
								label="로그인"
								onPress={() => {
									props.navigation.reset({
										index: 0,
										routes: [{ name: 'AuthStack' }],
									});
								}}
								icon={() => <Ionicons name="ios-log-in" size={25} color={Colors.primary} />}
							/>
						</View>
					</>
				)
			}
		</DrawerContentScrollView>
	)
}