import React, { useState } from 'react';
import { Dimensions, Pressable, StyleSheet, useColorScheme } from 'react-native';
import { IPick, ITrack } from '../../types';
import { Text, Box, FlatList, HStack, Center } from 'native-base';
import TrackPlayer from 'react-native-track-player';
import { Colors } from '../../styles/Colors';

interface IItem {
	item: IPick;
};

interface PicksProp {
	picks: IPick[] | undefined;
	isDarkMode: boolean;
}

const { width, height } = Dimensions.get('window');

function Picks({ picks, isDarkMode }: PicksProp) {
	const [focused, setFocused] = useState<String | Number>('');

	const timestampOn = {
		color: isDarkMode ? Colors.dark.primary : Colors.primary,
		fontWeight: '800',
		flexShrink: 1,
		lineHeight: 25,
	}
	const memoOn = {
		color: isDarkMode ? Colors.dark.primary : Colors.primary,
		fontWeight: 'bold',
		flexShrink: 1,
		lineHeight: 25,
	}
	const off = {
		color: isDarkMode ? Colors.dark.primaryText : Colors.primaryText,
		flexShrink: 1,
		lineHeight: 25,
	}
	const renderItem = (item: IItem) => {
		return (
			<Pressable
				key={item.item.id}
				onPressIn={() => setFocused(item.item.id)}
				onPress={() => TrackPlayer.seekTo(item.item.timestamp)}
				onPressOut={() => setFocused('')}
			>
				<HStack space='1' alignContent={'center'}>
					<Text style={focused === item.item.id ? timestampOn : off}>{
						new Date((item.item.timestamp) * 1000)
							.toISOString()
							.substr(14, 5)
					} </Text>
					<Text
						fontSize={'md'}
						key={item.item.id}
						style={focused === item.item.id ? memoOn : off}>
						{item.item.memo}{' '}</Text>
				</HStack>
			</Pressable>
		)
	}
	return (
		<Box style={styles.container}>
			<Box pl='4'>
				{picks?.length === 0 && <Text style={off}>아직 나만의 픽이 없어요! </Text>}
				<FlatList
					style={{ width: width * 0.93 }}
					data={picks}
					renderItem={renderItem}
					extraData={picks?.length}
					keyExtractor={(item) => item.id.toString()}
				/>
			</Box>
		</Box>
	);
}

export default Picks;

const styles = StyleSheet.create({
	container: {
		width: width * 0.93,
		height: height / 2,
	},
});