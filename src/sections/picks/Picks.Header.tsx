import React from 'react';
import { Box, Heading } from 'native-base';

interface HeaderProp {
	isDarkMode: boolean;
}
function Header({ isDarkMode }: HeaderProp) {
	return (
		<Box>
			<Heading color={isDarkMode ? 'white' : 'black'} fontSize="2xl" pl="4" pt='2'>좋아요</Heading>
		</Box>
	);
}

export default Header;