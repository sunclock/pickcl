import React from 'react';
import { Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Box, Flex, Divider } from 'native-base';

interface NavigationProps {
	category: string;
	setCategory: Function;
}

function Navigation({ category, setCategory }: NavigationProps) {
	return (
		<Box alignItems='center'>
			<ScrollView horizontal>
				<Box alignItems='center'>
					<Flex direction="row" p="4">
						{['음악파일', '재생 목록'].map((item, index) =>
							<TouchableOpacity key={index} style={{ width: width / 6, alignItems: 'center' }} onPress={() => setCategory(item)}>
								{category === item
									? <Text key={index} borderBottomWidth='8' borderBottomColor='#7575FF' fontSize='sm'>{item}</Text>
									: <Text key={index} borderBottomWidth='8' borderBottomColor='trueGray.200' fontSize='sm'>{item}</Text>
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