import React from 'react';
import { Box, Button, Heading, HStack, Text } from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Alert, Dimensions, Pressable } from 'react-native';
import { pickFiles } from '../../utils/Uploader';
import { useDispatch } from 'react-redux';
import { addTrack, resetTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';
import { convertTrackType } from '../../utils/Player';
import { ITrack } from '../../types';
import { Colors } from '../../styles/Colors';

interface HeaderProps {
	tracks: ITrack[];
	isDarkMode: boolean;
}

function Header({ tracks, isDarkMode }: HeaderProps) {
	const dispatch = useDispatch();
	return (
		<HStack justifyContent={'space-between'}>
			<Heading color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} fontSize="2xl" pl="4" pt='2'>트랙리스트</Heading>
			<HStack space='3' alignItems={'center'}>
				<Pressable onPress={async () => {
					Alert.alert(
						'재생 목록 초기화'
						, '재생 중인 모든 트랙이 삭제됩니다.'
						, [
							{ text: '취소', style: 'cancel' }
							, { text: '확인', onPress: async () => { dispatch(resetTrack()); await TrackPlayer.reset() } }
						]
					);
				}}>
					<Ionicon color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} name="ios-trash-outline" size={30} />
				</Pressable>
				<Pressable style={{ marginRight: 10 }} onPress={async () => {
					let newTracks = await pickFiles(tracks);
					dispatch(addTrack(newTracks))
					if (newTracks && newTracks?.length > 0) await TrackPlayer.add(convertTrackType(newTracks));
				}}>
					<Ionicon color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} name="ios-add-sharp" size={40} />
				</Pressable>
			</HStack>
		</HStack>
	);
}

export default Header;

const { width, height } = Dimensions.get('window')