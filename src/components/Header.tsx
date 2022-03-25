import React from 'react';
import { Box, Heading } from 'native-base';
import { Colors } from '../styles/Colors';

interface HeaderProp {
	isDarkMode: boolean;
	title: string;
}
function Header({ isDarkMode, title }: HeaderProp) {
	return (
		<Box w="100%" h="50">
			<Heading
				color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				fontSize="2xl" pl="4" pt='2'>
				{title}
			</Heading>
		</Box>
	);
}

export default Header;