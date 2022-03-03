import React, { useState } from 'react';
import { ITrack, IPick } from '../../types';
import { Text, Box } from 'native-base';
import { TrackListScreenProp } from '../../navigation/RootNavigator';
import TrackPlayer, { Track } from 'react-native-track-player';
import { TouchableOpacity, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTrack, changeTrack } from '../../reducers/track';
import { convertTrackType } from '../../utils/Player';

interface IItem {
	item: Track;
};

interface ListProps {
	navigation: TrackListScreenProp;
	tracks: ITrack[];
	picks: IPick[];
}

function List({ tracks, picks, navigation }: ListProps) {
	const [queue, setQueue] = useState();
	const dispatch = useDispatch();
	async function getQueue() {
		let queue = await TrackPlayer.getQueue()
		setQueue(queue);
	}
	getQueue();
	const renderItem = (item: IItem) => {
		return (
			<TouchableOpacity onPress={async () => {
				await TrackPlayer.skip(queue.indexOf(item.item));
				await TrackPlayer.play();
				dispatch(changeTrack(tracks[queue.indexOf(item.item)]));
				navigation.navigate('Track');
			}
			}>
				<Box borderBottomWidth='1' borderBottomColor='trueGray.100' py='2'>
					<Text fontSize='sm'>{item.item.title}</Text>
				</Box>
			</TouchableOpacity>
		)
	}
	return (
		<Box px='4' borderRadius='10'>
			<FlatList
				data={queue}
				renderItem={renderItem}
				keyExtractor={(item) => item.url}
			/>
		</Box>
	);
}

export default List;