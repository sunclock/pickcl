import React from 'react';
import { View, useColorScheme } from 'react-native';
import { VStack, HStack, Text, Button } from 'native-base';
import { useSelector } from 'react-redux';

function TrackList({ }) {
	const tracklists = useSelector(state => state.tracklists);
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<VStack
			style={{
				backgroundColor: isDarkMode ? 'black' : 'white',
			}}>
			<Text>TrackList</Text>
		</VStack>
	);
}

export default TrackList;