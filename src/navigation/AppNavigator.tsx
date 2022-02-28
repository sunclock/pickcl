import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './TabNavigator';
import TrackList from '../templates/tracklist.template';
import Picks from '../templates/picks.template';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				headerStyle: {
					backgroundColor: '#fff',
				},
				drawerActiveBackgroundColor: '#fff',
				drawerActiveTintColor: '#6667AB',
				headerTintColor: '#3f3f46',
				headerTitleStyle: {
				},
			})}
		>
			<Drawer.Screen name='Home' component={TabNavigator} />
			<Drawer.Screen name="TrackList" component={TrackList} />
			<Drawer.Screen name="Picks" component={Picks} />
		</Drawer.Navigator>
	);
};
