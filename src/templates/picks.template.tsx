import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../sections/picks/Picks.Header';
import { PicksScreenProps } from '../navigation/RootNavigator';
import FloatButton from '../sections/picks/Picks.FloatButton';

interface PicksProps {
	navigation: PicksScreenProps;
}
function Picks({ navigation }: PicksProps) {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? 'black' : 'white',
		flex: 1,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? 'black' : 'white'} />
			<Header />
			<FloatButton navigation={navigation} />
		</SafeAreaView>
	);
}

export default Picks;