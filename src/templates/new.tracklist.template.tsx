import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import { TrackListScreenProp } from '../navigation/AppNavigator';
import { Colors } from '../styles/Colors';

interface TrackListProp {
	navigation: TrackListScreenProp;
}
function TrackList({ navigation }: TrackListProp) {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		paddingBottom: StatusBar.currentHeight,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Header isDarkMode={isDarkMode} title={'재생중인 목록'} navigation={navigation} />
		</SafeAreaView>
	);
}

export default TrackList;