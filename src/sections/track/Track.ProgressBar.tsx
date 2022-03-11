import React from 'react';
import { Slider, Box, HStack, Text } from 'native-base';
import { Colors } from '../../styles/Colors';
import TrackPlayer, { useProgress } from 'react-native-track-player';

interface ProgressBarProp {
	isDarkMode: boolean,
}

function ProgressBar({ isDarkMode }: ProgressBarProp) {
	const progress = useProgress();
	return (
		<Box mx='3' my='5'>
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
		</Box>
	);
}

export default ProgressBar;