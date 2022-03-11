import React, { useEffect, useState } from 'react';
import { ITrack } from '../../types';
import { Pressable, Dimensions, StyleSheet } from 'react-native';
import { Text, HStack, Slider, Box } from 'native-base';
import TrackPlayer, { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { togglePlay } from '../../utils/Player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { changeTrack } from '../../reducers/track';
import { SampleTrack } from '../../assets/sample';
import { Colors } from '../../styles/Colors';

interface ControllerProp {
	track: ITrack;
	tracks: ITrack[];
	isDarkMode: boolean;
	skipInterval: number;
}

function Controller({ track, tracks, isDarkMode, skipInterval }: ControllerProp) {
	const [onPress, setPress] = useState('');
	const playbackState = usePlaybackState();
	const progress = useProgress();
	const dispatch = useDispatch();
	const iconColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	const backgroundColor = isDarkMode ? Colors.dark.hover : Colors.background;
	useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
			dispatch(changeTrack(tracks[event.nextTrack]));
		}
	})
	useEffect(() => {
		if (track === SampleTrack)
			TrackPlayer.stop();
	}, [track]);

	return (
		<HStack shadow={2} borderRadius='20' style={{ ...styles.container, backgroundColor: backgroundColor }}>
			<Box
				alignItems="center"
				justifyContent="center"
				width={60} height={60}
			>
				<Pressable
					onPressIn={async () => setPress('skip-back')}
					onPressOut={async () => setPress('')}
					onPress={async () => {
						await TrackPlayer.skipToPrevious().then(() => {
							TrackPlayer.getCurrentTrack().then((track) => {
								dispatch(changeTrack(tracks[track % tracks.length]));
							});
						})
					}}>
					<Ionicons
						name={onPress === 'skip-back' ? "ios-play-skip-back-sharp" : "ios-play-skip-back-outline"}
						size={40}
						color={iconColor}
					/>
				</Pressable>
			</Box>
			<Box
				alignItems="center"
				justifyContent="center"
				width={60} height={60}
			>
				<Pressable
					onPressIn={async () => setPress('play-back')}
					onPressOut={async () => setPress('')}
					onPress={async () => TrackPlayer.seekTo(progress.position - skipInterval)}>
					<Ionicons
						name={onPress === 'play-back' ? 'ios-play-back-sharp' : 'ios-play-back-outline'}
						size={40}
						color={iconColor}
					/>
				</Pressable>
			</Box>
			{playbackState === State.Playing
				? <Box
					alignItems="center"
					justifyContent="center"
					width={60} height={60}
				>
					<Pressable onPress={async () => await TrackPlayer.pause()}>
						<Ionicons
							name="ios-pause-outline"
							size={45}
							color={iconColor}
						/>
					</Pressable>
				</Box>
				: <Box
					alignItems="center"
					justifyContent="center"
					width={60} height={60}
				>
					<Pressable
						onPressIn={async () => setPress('play')}
						onPressOut={async () => setPress('')}
						onPress={async () => await togglePlay(playbackState)} >
						<Ionicons
							name={onPress === 'play' ? "ios-play-sharp" : "ios-play-outline"}
							size={45}
							color={iconColor}
						/>
					</Pressable>
				</Box>
			}
			<Box
				alignItems="center"
				justifyContent="center"
				width={60} height={60}
			>
				<Pressable
					onPressIn={async () => setPress('play-forward')}
					onPressOut={async () => setPress('')}
					onPress={async () => TrackPlayer.seekTo(progress.position + skipInterval)}>
					<Ionicons
						name={onPress === 'play-forward' ? 'ios-play-forward-sharp' : 'ios-play-forward-outline'}
						size={40}
						color={iconColor}
					/>
				</Pressable>
			</Box>
			<Box
				alignItems="center"
				justifyContent="center"
				width={60} height={60}
			>
				<Pressable
					onPressIn={async () => setPress('skip-next')}
					onPressOut={async () => setPress('')}
					onPress={async () => {
						await TrackPlayer.skipToNext().then(() => {
							TrackPlayer.getCurrentTrack().then((track) => {
								dispatch(changeTrack(tracks[track % tracks.length]));
							});
						})
					}}>
					<Ionicons
						name={onPress === 'skip-next' ? "ios-play-skip-forward-sharp" : "ios-play-skip-forward-outline"}
						size={40}
						color={iconColor}
					/>
				</Pressable>
			</Box>
		</HStack>
	);
}

export default Controller;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		marginTop: height * 0.02,
		borderColor: Colors.darkGray,
		marginHorizontal: 20,
		borderRadius: 15,
		padding: 10,
		paddingBottom: 5,
		justifyContent: 'space-between',
	},
});