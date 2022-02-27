import React from 'react';
import { View, useColorScheme } from 'react-native';
import { VStack, HStack, Text, Button } from 'native-base';
import { useSelector } from 'react-redux';

function Picks({ }) {
	const picks = useSelector(state => state.picks);
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<VStack
			style={{
				backgroundColor: isDarkMode ? 'black' : 'white',
			}}>
			<Text>Picks</Text>
		</VStack>
	);
}

export default Picks;