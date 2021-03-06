import React from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { Text, Box, VStack } from 'native-base';
import { TrackListScreenProp } from '../../navigation/RootNavigator';
import { ITrack, IPick } from '../../types';
import { useDispatch } from 'react-redux';
import { addTrack, changeTrack } from '../../reducers/track';
import TrackPlayer from 'react-native-track-player';
import { Colors } from '../../styles/Colors';
import { convertTrackType } from '../../utils/Player';

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
				<VStack justifyContent={'space-between'} borderBottomWidth='0.5' borderBottomColor={isDarkMode ? Colors.dark.border : Colors.extraLightGray} py='2'>
					<TouchableOpacity onPress={async () => {
						dispatch(changeTrack(item.track));
						let index = tracks.findIndex(track => track.url === item.track.url);
						if (index !== -1) {
							await TrackPlayer.skip(index)
						} else {
							dispatch(addTrack(item.track));
							await TrackPlayer.add(convertTrackType(item.track))
							if (tracks.length === 0)
								TrackPlayer.skip(0)
							else
								TrackPlayer.skip(tracks.length)
						}
						await TrackPlayer.seekTo(item.timestamp)
						await TrackPlayer.play();
						navigation.navigate('Track');
					}}>
						<Text color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} fontWeight='normal' fontSize='sm'>{item.memo}{' '}</Text>
						<Text color={isDarkMode ? Colors.extraLightGray : Colors.dark.secondaryText} fontSize='xs'>{item.track.filename} {new Date(item.timestamp * 1000).toISOString().substr(14, 5)}</Text>
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