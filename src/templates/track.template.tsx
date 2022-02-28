import React, { useState } from 'react';
import { useColorScheme, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { VStack, Box, Heading, Divider } from 'native-base';
import { useDispatch } from 'react-redux';
import { ITrackList, ITrack, IPick } from '../types';
import Header from '../sections/track/Track.Header';
import Artwork from '../sections/track/Track.Artwork';
import Picks from '../sections/track/Track.Picks';
import Player from '../sections/track/Track.Player';
import { SampleTrack, SamplePicks, SampleTrackList } from './sample';

export type TrackProps = {
	tracklist: ITrackList;
	track: ITrack;
	picks: IPick[];
};

const Track: React.FC<TrackProps> = ({ tracklist = SampleTrackList, track = SampleTrack, picks = SamplePicks }) => {
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? 'black' : 'white',
		flex: 1,
	};
	const [isArtwork, showArtwork] = useState(false);

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<Box alignItems={'center'} my='2'>
				<Header track={track} />
				<TouchableOpacity
					onPress={() => showArtwork(!isArtwork)}>
					{isArtwork
						? <Artwork track={track} />
						: <Picks track={track} picks={picks} />
					}
				</TouchableOpacity>
				<Player track={track} tracklist={tracklist} />
			</Box>
		</SafeAreaView>
	);
}

export default Track;