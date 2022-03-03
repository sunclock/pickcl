import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Text, Box } from 'native-base';
import { TrackListScreenProps } from '../../navigation/RootNavigator';
import { ITrack, ITrackList, IPick } from '../../types';
import { useDispatch } from 'react-redux';
import { addTrack, changeTrack, tpAddTrack, tpPlayTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';
import { convertTrackType } from '../../utils/Player';

interface IItem {
	item: ITrack;
};

interface FilesProps {
	navigation: TrackListScreenProps;
	tracks: ITrack[];
	picks: IPick[];
}

function Files({ navigation, tracks, picks }: FilesProps) {
	const dispatch = useDispatch();
	const renderItem = (item: IItem) => {
		return (
			<TouchableOpacity onPress={async () => {
				await TrackPlayer.skip(tracks.indexOf(item.item));
				await TrackPlayer.play();
				dispatch(changeTrack(item.item));
				await navigation.navigate('Track');
			}
			}>
				<Box borderBottomWidth='1' borderBottomColor='trueGray.100' py='2'>
					<Text fontSize='sm'>{item.item.filename}</Text>
				</Box>
			</TouchableOpacity>
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

export default Files;