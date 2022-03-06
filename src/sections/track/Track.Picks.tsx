import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet } from 'react-native';
import { IPick, ITrack } from '../../types';
import { Text, Box, FlatList, HStack } from 'native-base';
import TrackPlayer from 'react-native-track-player';

interface IItem {
	item: IPick;
};

interface PicksProp {
	track: ITrack;
	picks: IPick[] | undefined;
}

const { width, height } = Dimensions.get('window');

function Picks({ picks }: PicksProp) {
	const [focused, setFocused] = useState<String | Number>('');
	const renderItem = (item: IItem) => {
		return (
			<Pressable
				key={item.item.id}
				onPressIn={() => setFocused(item.item.id)}
				onPress={() => TrackPlayer.seekTo(item.item.timestamp)}
				onPressOut={() => setFocused('')}
			>
				<HStack space='1' alignContent={'center'}>
					<Text style={focused === item.item.id ? styles.timestampOn : styles.off}>{
						new Date((item.item.timestamp) * 1000)
							.toISOString()
							.substr(14, 5)
					} </Text>
					<Text
						fontSize={'md'}
						key={item.item.id}
						style={focused === item.item.id ? styles.memoOn : styles.off}>
						{item.item.memo}</Text>
				</HStack>
			</Pressable>
		)
	}
	return (
		<Box alignSelf={'center'} borderRadius='20' style={styles.container}>
			<Box p='4'>
				<FlatList
					data={picks}
					renderItem={renderItem}
					extraData={picks?.length}
					keyExtractor={(item) => item.id.toString()}
				/>
				{picks?.length === 0 && <Text>아직 나만의 픽이 없어요! </Text>}
			</Box>
		</Box >
	);
}

export default Picks;

const styles = StyleSheet.create({
	container: {
		width: width * 0.9,
		height: height / 1.8,
	},
	timestampOn: {
		color: '#7575FF',
		fontWeight: '800',
	},
	memoOn: {
		color: '#7575FF',
		borderBottomColor: '#7575FF',
		borderBottomWidth: 2,
		fontWeight: 'bold',
		flexShrink: 1,
	},
	off: {
		color: 'gray',
		flexShrink: 1,
	}
});