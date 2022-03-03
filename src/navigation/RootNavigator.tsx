import * as React from 'react';
import { createMaterialBottomTabNavigator, MaterialBottomTabNavigationProp, MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import IonIcons from 'react-native-vector-icons/Ionicons';
import TrackList from '../templates/tracklist.template';
import Track from '../templates/track.template';
import Picks from '../templates/picks.template';
import { ITrack, ITrackList, IPick } from '../types';
import { CompositeNavigationProp } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { SamplePicks, SampleTrack } from '../templates/sample';

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

export type PicksScreenProps = CompositeNavigationProp<
	MaterialBottomTabNavigationProp<TabParamList, 'Picks'>,
	NativeStackNavigationProp<StackParamList>
>;

export type TrackListScreenProp = CompositeNavigationProp<
	MaterialBottomTabNavigationProp<TabParamList, 'TrackListTab'>,
	NativeStackNavigationProp<StackParamList>
>;

export type TrackListScreenRouteProps = RouteProp<TabParamList, 'TrackListTab'>;

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

export const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="TrackListTab"
			activeColor="#6667AB"
			inactiveColor="#3f3f46"
			barStyle={{
				position: 'absolute',
				bottom: 20,
				left: 20,
				right: 20,
				backgroundColor: '#ffffff',
				borderRadius: 15,
				padding: 5,
				paddingBottom: 5,
			}}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName;
					const color = focused ? '#6667AB' : '#3f3f46';
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
				}}
			/>
			<Tab.Screen
				name="Picks"
				component={Picks}
				options={{
					tabBarLabel: 'Picks',
					tabBarBadge: 1,
				}}
			/>
		</Tab.Navigator>
	);
};
