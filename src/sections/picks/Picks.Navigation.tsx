import React from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Box, Flex } from 'native-base';

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
									? <Text color={isDarkMode ? 'white' : 'black'} key={index} borderBottomWidth='8' borderBottomColor='#7575FF' fontSize='sm'>{item}</Text>
									: <Text color={isDarkMode ? 'white' : 'black'} key={index} borderBottomWidth='8' borderBottomColor='trueGray.200' fontSize='sm'>{item}</Text>
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