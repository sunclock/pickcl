import React from 'react';
import { Avatar, Heading, HStack } from 'native-base';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Alert, Dimensions, Pressable, TouchableOpacity, useColorScheme } from 'react-native';
import { pickFiles } from '../../utils/Uploader';
import { useDispatch } from 'react-redux';
import { addTrack, resetTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';
import { convertTrackType } from '../../utils/Player';
import { ITrack } from '../../types';
import { Colors } from '../../styles/Colors';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { TrackListScreenProp } from '../../navigation/RootNavigator';

interface HeaderProps {
	tracks: ITrack[];
	user: FirebaseAuthTypes.User;
	navigation: TrackListScreenProp;
}

function Header({ tracks, navigation, user }: HeaderProps) {
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<HStack p='1' ml='3' mt='2' mb='1' justifyContent={'space-between'} alignItems={'center'}>
			<TouchableOpacity
				onPress={() => {
					navigation.openDrawer();
				}}>
				<Avatar size={30}
					bg={isDarkMode ? Colors.dark.primary : Colors.primary}
					source={{
						uri: user?.photoURL
					}}></Avatar>
			</TouchableOpacity>
			<Heading
				color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				fontSize="xl">
				트랙리스트
			</Heading>
			<HStack space='3' alignItems={'center'}>
				<Pressable onPress={async () => {
					Alert.alert(
						'재생 목록 초기화'
						, '현재 재생 중인 트랙을 포함한 모든 트랙을 삭제합니다.'
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