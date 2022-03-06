import React, { useEffect, useState } from 'react';
import { useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import Navigation from '../sections/tracklist/TrackList.Navigation';
import Header from '../sections/tracklist/TrackList.Header';
import FloatButton from '../sections/tracklist/TrackList.FloatButton';
import List from '../sections/tracklist/TrackList.List';
import { TrackListScreenProp } from '../navigation/RootNavigator';
import { IPick } from '../types';
import { setupIfNeeded } from '../utils/Player';
import TrackPlayer from 'react-native-track-player';

interface TrackListProp {
	navigation: TrackListScreenProp;
}

const TrackList = ({ navigation }: TrackListProp) => {
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const track = useSelector((state: any) => state.tracks.currentTrack);
	const picks = useSelector((state: any) => state.picks.picks.filter((pick: IPick) => pick.track.url === track.url));
	const [category, setCategory] = useState('음악 파일');
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? 'black' : 'white',
		flex: 1,
	};

	useEffect(() => {
		setupIfNeeded(tracks);
	}, []);

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? 'black' : 'white'} />
			<Header tracks={tracks} />
			<Navigation category={category} setCategory={setCategory} />
			{category === '음악 파일' && <List navigation={navigation} tracks={tracks} picks={picks} />}
			<FloatButton navigation={navigation} />
		</SafeAreaView>
	);
}

export default TrackList;