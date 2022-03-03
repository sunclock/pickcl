import React from 'react';
import { TouchableOpacity, FlatList, Pressable } from 'react-native';
import { Text, Box, HStack } from 'native-base';
import { TrackListScreenProp } from '../../navigation/RootNavigator';
import { ITrack } from '../../types';
import { useDispatch } from 'react-redux';
import { changeTrack, removeTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IItem {
	item: ITrack;
};

interface ListProp {
	navigation: TrackListScreenProp;
	tracks: ITrack[];
}

function List({ navigation, tracks }: ListProp) {
	const dispatch = useDispatch();
	const renderItem = (item: IItem) => {
		return (
			<HStack justifyContent={'space-between'} borderBottomWidth='1' borderBottomColor='trueGray.100' py='2'>
				<Box>
					<TouchableOpacity onPress={async () => {
						await TrackPlayer.skip(tracks.indexOf(item.item));
						await TrackPlayer.play();
						dispatch(changeTrack(item.item));
						navigation.navigate('Track');
					}
					}>
						<Text fontSize='sm'>{item.item.filename}</Text>
					</TouchableOpacity>
				</Box>
				<Box>
					<Pressable onPress={async () => {
						await TrackPlayer.remove(tracks.indexOf(item.item));
						dispatch(removeTrack(item.item.id));
					}}>
						<Ionicons name='ios-close' size={24} color='gray' />
					</Pressable>
				</Box>
			</HStack>
		)
	}
	return (
		<Box px='4' borderRadius='10'>
			<FlatList
				data={tracks}
				renderItem={renderItem}
				keyExtractor={(item) => item.url}
			/>
		</Box>
	);
}

export default List;