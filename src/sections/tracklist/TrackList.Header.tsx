import React from 'react';
import { Box, Button, Heading, HStack, Text } from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Dimensions, Pressable } from 'react-native';
import { pickFiles } from '../../utils/Uploader';
import { useDispatch } from 'react-redux';
import { addTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';
import { convertTrackType } from '../../utils/Player';
import { ITrack } from '../../types';

interface HeaderProps {
	tracks: ITrack[];
}

function Header({ tracks }: HeaderProps) {
	const dispatch = useDispatch();
	return (
		<HStack>
			<Box width={width / 1.15}>
				<Heading fontSize="2xl" pl="4" pt='2'>트랙리스트</Heading>
			</Box>
			<Box alignItems='center' justifyContent="center">
				<Pressable onPress={async () => {
					let newTracks = await pickFiles(tracks);
					dispatch(addTrack(newTracks))
					if (newTracks && newTracks?.length > 0) await TrackPlayer.add(convertTrackType(newTracks));
				}
				}>
					<Ionicon name="ios-add-sharp" size={40} color="black" />
				</Pressable>
			</Box>
		</HStack>
	);
}

export default Header;

const { width, height } = Dimensions.get('window')