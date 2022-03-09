import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Text, Box, Flex } from 'native-base';

interface NavigationProp {
	isDarkMode: boolean;
}

function Navigation({ isDarkMode }: NavigationProp) {
	return (
		<Box alignItems='center'>
			<ScrollView horizontal>
				<Box alignItems='center'>
					<Flex direction="row" p="4">
						<Text color={isDarkMode ? 'white' : 'black'} borderBottomWidth='8' borderBottomColor='#7575FF' fontSize='sm'>음악파일</Text>
					</Flex>
				</Box>
			</ScrollView>
		</Box>
	);
}

export default Navigation;

const { width } = Dimensions.get('window');