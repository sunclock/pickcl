import React, { useState } from 'react';
import { useColorScheme, SafeAreaView, StatusBar, View } from 'react-native';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import { PicksScreenProp } from '../navigation/RootNavigator';
import FloatButton from '../sections/picks/Picks.FloatButton';
import List from '../sections/picks/Picks.List';
import Navigation from '../sections/picks/Picks.Navigation';
import { Colors } from '../styles/Colors';

interface PicksProp {
	navigation: PicksScreenProp;
}
function Picks({ navigation }: PicksProp) {
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const picks = useSelector((state: any) => state.picks.picks);
	const [category, setCategory] = useState('모두 보기');
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		paddingBottom: StatusBar.currentHeight,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Header isDarkMode={isDarkMode} title={'좋아요'} />
			<Navigation category={category} setCategory={setCategory} isDarkMode={isDarkMode} />
			{category === '모두 보기' && <List navigation={navigation} tracks={tracks} picks={picks} isDarkMode={isDarkMode} />}
			<FloatButton navigation={navigation} />
		</SafeAreaView>
	);
}

export default Picks;