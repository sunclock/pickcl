import React, { useState } from 'react';
import { useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../sections/picks/Picks.Header';
import { PicksScreenProp } from '../navigation/RootNavigator';
import FloatButton from '../sections/picks/Picks.FloatButton';
import List from '../sections/picks/Picks.List';
import Navigation from '../sections/picks/Picks.Navigation';

interface PicksProp {
	navigation: PicksScreenProp;
}
function Picks({ navigation }: PicksProp) {
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const picks = useSelector((state: any) => state.picks.picks);
	const [category, setCategory] = useState('모두 보기');
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? 'black' : 'white',
		flex: 1,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? 'black' : 'white'} />
			<Header />
			<Navigation category={category} setCategory={setCategory} />
			{category === '모두 보기' && <List navigation={navigation} tracks={tracks} picks={picks} />}
			<FloatButton navigation={navigation} />
		</SafeAreaView>
	);
}

export default Picks;