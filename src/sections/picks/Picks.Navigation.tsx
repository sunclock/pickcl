import React from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Box, Flex } from 'native-base';
import { Colors } from '../../styles/Colors';

interface NavigationProps {
	category: string;
	setCategory: Function;
	isDarkMode: boolean;
}

function Navigation({ category, setCategory, isDarkMode }: NavigationProps) {
	return (
		<Box alignItems='center'>
			<ScrollView horizontal>
				<Box alignItems='center'>
					<Flex direction="row" p="4">
						{['모두 보기'].map((item, index) =>
							<TouchableOpacity key={index} style={{ width: width / 6, alignItems: 'center' }} onPress={() => setCategory(item)}>
								{category === item
									? <Text color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} key={index} borderBottomWidth='8' borderBottomColor={Colors.primary} fontSize='sm'>{item}</Text>
									: <Text color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} key={index} borderBottomWidth='8' borderBottomColor={Colors.lightGray} fontSize='sm'>{item}</Text>
								}
							</TouchableOpacity>
						)}
					</Flex>
				</Box>
			</ScrollView>
		</Box>
	);
}

export default Navigation;

const { width } = Dimensions.get('window');