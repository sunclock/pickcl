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
	isDarkMode: boolean;
}

function List({ navigation, tracks, picks, isDarkMode }: ListProp) {
	const dispatch = useDispatch();
	const renderItem = ({ item, index }: { item: IPick, index: number }) => {
		return (
			<>
				<VStack justifyContent={'space-between'} borderBottomWidth='1' borderBottomColor='trueGray.100' py='2'>
					<TouchableOpacity onPress={async () => {
						await TrackPlayer.skip(
							tracks.findIndex(track => track.id === item.track.id));
						await TrackPlayer.seekTo(item.timestamp)
						await TrackPlayer.play();
						dispatch(changeTrack(item.track));
						navigation.navigate('Track');
					}
					}>
						<Text color={isDarkMode ? 'white' : 'black'} fontWeight='normal' fontSize='sm'>{item.memo}{' '}</Text>
						<Text color={isDarkMode ? 'white' : 'gray.500'} fontSize='xs'>{item.track.filename} {new Date(item.timestamp * 1000).toISOString().substr(14, 5)}</Text>
					</TouchableOpacity>
				</VStack>
				{index === picks.length - 1 && <Box h='300'></Box>}
			</>
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