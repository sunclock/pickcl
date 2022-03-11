import React, { useEffect } from 'react';
import { createMaterialBottomTabNavigator, MaterialBottomTabNavigationProp } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import IonIcons from 'react-native-vector-icons/Ionicons';
import TrackList from '../templates/tracklist.template';
import Track from '../templates/track.template';
import Picks from '../templates/picks.template';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import { Alert, BackHandler, Dimensions, useColorScheme } from 'react-native';
import { resetTrack } from '../reducers/track';
import { resetPick } from '../reducers/pick';
import { Colors } from '../styles/Colors';

type TabParamList = {
	Picks: undefined;
	TrackListTab: undefined;
}

type StackParamList = {
	TrackList: undefined;
	Track: undefined;
};

export type TrackScreenRouteProp = RouteProp<StackParamList, 'Track'>;

export type TrackScreenProp = NativeStackNavigationProp<StackParamList, 'Track'>;

export type PicksScreenProp = CompositeNavigationProp<
	MaterialBottomTabNavigationProp<TabParamList, 'Picks'>,
	NativeStackNavigationProp<StackParamList>
>;

export type TrackListScreenProp = CompositeNavigationProp<
	MaterialBottomTabNavigationProp<TabParamList, 'TrackListTab'>,
	NativeStackNavigationProp<StackParamList>
>;

export type TrackListScreenRouteProp = RouteProp<TabParamList, 'TrackListTab'>;

const Stack = createNativeStackNavigator<StackParamList>();

export const RootNavigator = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="TrackList" component={TabNavigator} />
			<Stack.Screen name="Track" component={Track} />
		</Stack.Navigator>
	);
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

const { width, height } = Dimensions.get('window');

export const TabNavigator = () => {
	const picks = useSelector((state: any) => state.picks.picks);
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const dispatch = useDispatch()

	const isDarkMode = useColorScheme() === 'dark';

	useEffect(() => {
		const backAction = () => {
			Alert.alert("앱 종료", "앱을 종료하시겠습니까? 모든 정보가 초기화됩니다.", [
				{
					text: "취소",
					onPress: () => null,
				},
				{
					text: "확인", onPress: () => {
						dispatch(resetTrack());
						dispatch(resetPick());
						TrackPlayer.destroy()
						BackHandler.exitApp()
					}
				}
			]);
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);
	return (
		<Tab.Navigator
			initialRouteName="TrackListTab"
			activeColor={isDarkMode ? Colors.dark.primaryText : Colors.primary}
			inactiveColor={isDarkMode ? Colors.darkGray : Colors.darkGray}
			barStyle={{
				position: 'absolute',
				bottom: height / 30,
				left: 20,
				right: 20,
				backgroundColor: isDarkMode ? Colors.dark.hover : Colors.background,
				borderRadius: 15,
				padding: 5,
				paddingBottom: 5,
			}}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName;
					const color = focused
						? isDarkMode ? Colors.dark.primaryText : Colors.primary
						: isDarkMode ? Colors.darkGray : Colors.lightGray;
					if (route.name == 'TrackListTab')
						if (focused) iconName = 'ios-list-sharp';
						else iconName = 'ios-list-outline';
					else if (route.name == 'Picks')
						if (focused) iconName = 'ios-heart-sharp';
						else iconName = 'ios-heart-outline';
					return <IonIcons name={iconName} size={25} color={color} />;
				},
			})}
		>
			<Tab.Screen
				name="TrackListTab"
				component={TrackList}
				options={{
					tabBarLabel: 'TrackList',
					tabBarBadge: tracks.length ? tracks.length : null,
				}}
			/>
			<Tab.Screen
				name="Picks"
				component={Picks}
				options={{
					tabBarLabel: 'Picks',
					tabBarBadge: picks.length ? picks.length : null,
				}}
			/>
		</Tab.Navigator>
	);
};
