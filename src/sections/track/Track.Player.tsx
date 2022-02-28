import React, { ReactNode, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ITrack, ITrackList } from '../../types';
import { Text, HStack, Slider, Box } from 'native-base';
import TrackPlayer, { Capability, Event, RepeatMode, State, Track, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { setupIfNeeded, togglePlayback } from '../../utils/Player';
import { pickFiles, readDocuments } from '../../utils/Uploader';

interface PlayerProps {
	track: ITrack,
	tracklist: ITrackList,
	// children: ReactNode[] | ReactNode;
}

function Player({ track }: PlayerProps) {
	const playbackState = usePlaybackState();
	const progress = useProgress();

	useEffect((): void => {
		// setupIfNeeded()
		// pickFiles()
		// readDocuments()
	}, []);

	return (
		<HStack style={styles.artwork} space={1}>
			<Text>트랙 플레이어 부분</Text>
		</HStack>
	);
}

export default Player;

const styles = StyleSheet.create({
	artwork: {
		width: '100%',
		height: 200,
		borderRadius: 10,
		padding: 10,
		margin: 5,
	},
});