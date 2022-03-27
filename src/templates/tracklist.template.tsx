import React, { useEffect } from 'react';
import { useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Navigation from '../sections/tracklist/TrackList.Navigation';
import FloatButton from '../sections/tracklist/TrackList.FloatButton';
import List from '../sections/tracklist/TrackList.List';
import { TrackListScreenProp } from '../navigation/RootNavigator';
import { IPick } from '../types';
import { setupIfNeeded } from '../utils/Player';
import { SampleTrack } from '../assets/sample';
import { Colors } from '../styles/Colors';
import Header from '../components/Header';

interface TrackListProp {
	navigation: TrackListScreenProp;
}

const TrackList = ({ navigation }: TrackListProp) => {
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const user = useSelector((state: any) => state.auth.user);
	let track = useSelector((state: any) => state.tracks.currentTrack);
	if (!track) {
		track = SampleTrack;
	};
	const picks = useSelector((state: any) => state.picks.picks.filter((pick: IPick) => pick.track.url === track.url));
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		paddingBottom: StatusBar.currentHeight,
	};

	useEffect(() => {
		setupIfNeeded(tracks);
	}, []);

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Header title={'재생 목록'} navigation={navigation} isDarkMode={isDarkMode} />
			<Navigation isDarkMode={isDarkMode} />
			<List navigation={navigation} tracks={tracks} picks={picks} isDarkMode={isDarkMode} />
			<FloatButton navigation={navigation} />
		</SafeAreaView>
	);
}

export default TrackList;