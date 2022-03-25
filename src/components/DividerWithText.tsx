import React from 'react';
import { useColorScheme } from 'react-native';
import { Divider, Text, HStack } from 'native-base';
import { Colors } from '../styles/Colors';

interface DividerWithTextProp {
	text: string;
}

function DividerWithText({ text }: DividerWithTextProp) {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<HStack mb="4">
			<Divider w="100" alignSelf={'center'} mr="2" />
			<Text
				fontWeight={'bold'}
				color={isDarkMode ? Colors.dark.primaryText : Colors.primary}>
				{text}
			</Text>
			<Divider w="100" alignSelf={'center'} ml="2" />
		</HStack>
	);
}

export default DividerWithText;