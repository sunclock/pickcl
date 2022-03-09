import React from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { Text, Box, Flex } from 'native-base';
import { Colors } from '../../styles/Colors';

interface NavigationProp {
	isDarkMode: boolean;
}

function Navigation({ isDarkMode }: NavigationProp) {
	return (
		<Box alignItems='center'>
			<ScrollView horizontal>
				<Box alignItems='center'>
					<Flex direction="row" p="4">
						<Text color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} borderBottomWidth='8' borderBottomColor={Colors.primary} fontSize='sm'>음악파일</Text>
					</Flex>
				</Box>
			</ScrollView>
		</Box>
	);
}

export default Navigation;

const { width } = Dimensions.get('window');