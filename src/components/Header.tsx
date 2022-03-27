import React from 'react';
import { Avatar, Box, Heading, HStack } from 'native-base';
import { Colors } from '../styles/Colors';
import { useSelector } from 'react-redux';
import { TouchableOpacity, useColorScheme } from 'react-native';

interface HeaderProp {
	title: string;
	navigation: any;
	isDarkMode: boolean;
}

function Header({ title, navigation, isDarkMode }: HeaderProp) {
	const user = useSelector((state: any) => state.auth.user);

	return (
		<HStack p='1' ml='3' mt='2' mb='1' justifyContent={'space-between'} alignItems={'center'}>
			<TouchableOpacity
				onPress={() => {
					navigation.openDrawer();
				}}>
				<Avatar size={30}
					bg={isDarkMode ? Colors.dark.primary : Colors.primary}
					source={{
						uri: user?.photoURL
					}}></Avatar>
			</TouchableOpacity>
			<Heading
				color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				fontSize="xl">
				{title}
			</Heading>
			<Box w='10'>
			</Box>
		</HStack>
	);
}

export default Header;