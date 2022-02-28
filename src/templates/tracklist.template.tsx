import React from 'react';
import { View, useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import { VStack, HStack, Text, Button } from 'native-base';
import { useSelector } from 'react-redux';

function TrackList({ }) {
	const tracklists = useSelector(state => state.tracklists.tracklists);
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? 'black' : 'white',
		flex: 1,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<VStack
				style={{
					backgroundColor: isDarkMode ? 'black' : 'white',
				}}>
				<Text>TrackList</Text>
			</VStack>
		</SafeAreaView>
	);
}

export default TrackList;