import React, { useState } from 'react';
import { useColorScheme, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { IPick } from '../types';
import Title from '../sections/track/Track.Title';
import Artwork from '../sections/track/Track.Artwork';
import Picks from '../sections/track/Track.Picks';
import Player from '../sections/track/Track.Player';
import { TrackScreenProp } from '../navigation/RootNavigator';
import Header from '../sections/track/Track.Header';

interface TrackProp {
	navigation: TrackScreenProp;
};

const Track = ({ navigation }: TrackProp) => {
	const track = useSelector((state: any) => state.tracks.currentTrack);
	console.log('current track', track);
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const picks = useSelector((state: any) => state.picks.picks.filter((pick: IPick) => pick.track.url === track.url));
	const [isArtwork, setArtwork] = useState(false);

	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? 'black' : 'white',
		flex: 1,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? 'black' : 'white'} />
			<Header navigation={navigation} />
			<Title track={track} />
			<TouchableOpacity onPress={() => setArtwork(!isArtwork)}>
				{isArtwork
					? <Artwork track={track} />
					: <Picks track={track} picks={picks} />
				}
			</TouchableOpacity>
			<Player track={track} tracks={tracks} />
		</SafeAreaView>
	);
}

export default Track;