import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Track from '../templates/track.template';
import TrackList from '../templates/tracklist.template';
import Picks from '../templates/picks.template';

const Tab = createMaterialBottomTabNavigator();

export const TabNavigator = () => {
	return (
		<Tab.Navigator
			initialRouteName="Track"
			activeColor="#6667AB"
			inactiveColor="#3f3f46"
			barStyle={{ backgroundColor: '#fff' }}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconName;
					const color = focused ? '#6667AB' : '#3f3f46';
					if (route.name == 'Track')
						if (focused) iconName = 'ios-play-sharp';
						else iconName = 'ios-play-outline';
					else if (route.name == 'TrackList')
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
				name="Picks"
				component={Picks}
				options={{
					tabBarLabel: 'Picks',
					tabBarBadge: 1,
				}}
			/>
			<Tab.Screen
				name="Track"
				component={Track}
				options={{
					tabBarLabel: 'Track',
				}}
			/>
			<Tab.Screen
				name="TrackList"
				component={TrackList}
				options={{
					tabBarLabel: 'TrackList',
				}}
			/>
		</Tab.Navigator>
	);
};
