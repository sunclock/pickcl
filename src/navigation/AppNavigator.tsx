import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TabNavigator } from './RootNavigator';
import TrackList from '../templates/tracklist.template';
import Picks from '../templates/picks.template';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from 'native-base';

const Drawer = createDrawerNavigator();

export const AppNavigator = () => {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			screenOptions={({ route }) => ({
				drawerActiveBackgroundColor: '#fff',
				drawerActiveTintColor: '#6667AB',
				headerTintColor: '#3f3f46',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				drawerIcon: ({ focused }) => {
					let iconName;
					const color = focused ? '#6667AB' : '#3f3f46';
					if (route.name == 'Home')
						if (focused) iconName = 'ios-home-sharp';
						else iconName = 'ios-home-outline';
					else if (route.name == 'TrackList')
						if (focused) iconName = 'ios-list-sharp';
						else iconName = 'ios-list-outline';
					else if (route.name == 'Picks')
						if (focused) iconName = 'ios-heart-sharp';
						else iconName = 'ios-heart-outline';
					return <Ionicons name={iconName} size={25} color={color} />;
				},
				headerTitle: () => {
					if (route.name == 'Home') return <Text>Home</Text>;
					else if (route.name == 'TrackList') return <Text>TrackList</Text>;
					else if (route.name == 'Picks') return <Text>Picks</Text>;
				},
			})}
		>
			<Drawer.Screen name='Home' component={TabNavigator} />
			<Drawer.Screen name="TrackList" component={TrackList} />
			<Drawer.Screen name="Picks" component={Picks} />
		</Drawer.Navigator>
	);
};
