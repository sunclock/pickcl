import React from 'react';
import { useColorScheme } from 'react-native';
import { Button, Text } from 'native-base';

interface MonotoneButtonProp {
	text: string;
	onPress: Function;
}

function MonotoneButton({ text, onPress }: MonotoneButtonProp) {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<Button
			onPress={() => onPress()}
			w="300"
			variant={'solid'}
			borderWidth={isDarkMode ? 0 : 0.5}
			colorScheme={'light'}
			bgColor={'white'}
			mb="4">
			<Text
				fontSize={'md'}
				fontWeight={'semibold'}
				color={'black'}>
				{text}
			</Text>
		</Button>
	);
}

export default MonotoneButton;