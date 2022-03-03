import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Text, Box, VStack } from 'native-base';
import { TrackListScreenProp } from '../../navigation/RootNavigator';
import { ITrack, IPick } from '../../types';
import { useDispatch } from 'react-redux';
import { changeTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';

interface IItem {
	item: IPick;
};

interface ListProp {
	navigation: TrackListScreenProp;
	tracks: ITrack[];
	picks: IPick[];
}

function List({ navigation, tracks, picks }: ListProp) {
	const dispatch = useDispatch();
	const renderItem = (item: IItem) => {
		return (
			<VStack justifyContent={'space-between'} borderBottomWidth='1' borderBottomColor='trueGray.100' py='2'>
				<TouchableOpacity onPress={async () => {
					await TrackPlayer.skip(
						tracks.findIndex(track => track.id === item.item.track.id));
					await TrackPlayer.seekTo(item.item.timestamp)
					await TrackPlayer.play();
					dispatch(changeTrack(item.item.track));
					navigation.navigate('Track');
				}
				}>
					<Text color='gray.900' fontWeight='normal' fontSize='sm'>{item.item.memo}</Text>
					<Text color='gray.500' fontSize='xs'>{item.item.track.filename} {new Date(item.item.timestamp * 1000).toISOString().substr(14, 5)}</Text>
				</TouchableOpacity>
			</VStack>
		)
	}
	return (
		<Box px='4' borderRadius='10'>
			<FlatList
				data={picks}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</Box>
	);
}

export default List;