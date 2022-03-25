import React from 'react';
import { useColorScheme } from 'react-native';
import { Button, Text } from 'native-base';
import { Colors } from '../styles/Colors';

interface ColorButtonProp {
	text: string;
	onPress: Function;
}

function ColorButton({ text, onPress }: ColorButtonProp) {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<Button
			onPress={() => onPress()}
			w="300"
			variant={'solid'}
			colorScheme={'light'}
			borderWidth={isDarkMode ? 0 : 0.5}
			bgColor={isDarkMode ? Colors.dark.primary : Colors.primary}
			mb="4">
			<Text
				fontSize={'md'}
				fontWeight={'semibold'}
				color={'white'}>
				{text}
			</Text>
		</Button>
	);
}

export default ColorButton;