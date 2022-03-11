import React, { useEffect, useState } from 'react';
import { ITrack } from '../../types';
import { Pressable } from 'react-native';
import { Text, HStack, Slider, Box } from 'native-base';
import TrackPlayer, { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { togglePlay } from '../../utils/Player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { changeTrack } from '../../reducers/track';
import { SampleTrack } from '../../assets/sample';
import { Colors } from '../../styles/Colors';

interface PlayerProp {
	track: ITrack;
	tracks: ITrack[];
	isDarkMode: boolean;
	skipInterval: number;
}

function Player({ track, tracks, isDarkMode, skipInterval }: PlayerProp) {
	const [onPress, setPress] = useState('');
	const playbackState = usePlaybackState();
	const progress = useProgress();
	const dispatch = useDispatch();
	const iconColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
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
		<Box mx='3' my='5'>
			<Box w="100%">
				<Slider w="100%"
					value={progress.position}
					defaultValue={0} minValue={0} maxValue={progress.duration}
					accessibilityLabel="Track Timestamp" step={0.0001}
					colorScheme={isDarkMode ? 'dark' : 'light'}
					onChangeEnd={async (v) => await TrackPlayer.seekTo(v)}>
					<Slider.Track>
						<Slider.FilledTrack />
					</Slider.Track>
					<Slider.Thumb />
				</Slider>
			</Box>
			<HStack justifyContent={'space-between'}>
				<Box>
					<Text textAlign="center" color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
						{new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
				</Box>
				<Box>
					<Text textAlign="center" color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
						{new Date((progress.duration - progress.position) * 1000)
							.toISOString()
							.substr(14, 5)}</Text>
				</Box>
			</HStack>
			<HStack m='4' space='2' alignSelf={'center'}>
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
		</Box >
	);
}

export default Player;