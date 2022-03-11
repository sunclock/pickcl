import React, { useState } from 'react';
import { useColorScheme, TouchableOpacity, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { IPick } from '../types';
import Title from '../sections/track/Track.Title';
import Artwork from '../sections/track/Track.Artwork';
import Picks from '../sections/track/Track.Picks';
import Controller from '../sections/track/Track.Controller';
import { TrackScreenProp } from '../navigation/RootNavigator';
import Header from '../sections/track/Track.Header';
import { SampleTrack } from '../assets/sample';
import { Colors } from '../styles/Colors';
import Options from '../sections/track/Track.Options';
import ProgressBar from '../sections/track/Track.ProgressBar';

interface TrackProp {
	navigation: TrackScreenProp;
};

const Track = ({ navigation }: TrackProp) => {
	let track = useSelector((state: any) => state.tracks.currentTrack);
	if (track == undefined) {
		track = SampleTrack;
	};
	const tracks = useSelector((state: any) => state.tracks.tracks);
	const skipInterval = useSelector((state: any) => state.tracks.settings.skipInterval);
	const picks = useSelector((state: any) => state.picks.picks.filter((pick: IPick) => pick.track.url === track.url));
	const [isArtwork, setArtwork] = useState(false);
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={isDarkMode ? Colors.dark.background : Colors.background}
			/>
			<Header navigation={navigation} isDarkMode={isDarkMode} />
			<Title track={track} isDarkMode={isDarkMode} />
			<TouchableOpacity onPress={() => setArtwork(!isArtwork)} >
				{isArtwork
					? <Artwork track={track} isDarkMode={isDarkMode} />
					: <Picks picks={picks} isDarkMode={isDarkMode} />
				}
			</TouchableOpacity>
			<ProgressBar isDarkMode={isDarkMode} />
			<Options track={track} isDarkMode={isDarkMode} skipInterval={skipInterval} />
			<Controller track={track} tracks={tracks} isDarkMode={isDarkMode} skipInterval={skipInterval} />
		</SafeAreaView>
	);
}

export default Track;