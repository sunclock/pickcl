import { Divider, HStack, Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { Colors } from '../../styles/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface HomeMenuItemProp {
	title: string;
	iconName: string;
	onPress: Function;
}

function HomeMenuItem({ title, iconName, onPress }: HomeMenuItemProp) {
	const isDarkMode = useColorScheme() === 'dark';
	const fontColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	return (
		<TouchableOpacity onPress={() => onPress()}>
			<HStack m='2' p='1' alignItems={'center'} justifyContent={'space-between'}>
				<HStack space={'3'} alignItems={'center'}>
					<MaterialCommunityIcons
						name={iconName}
						size={25}
						color={fontColor} />
					<Text fontSize={'lg'} color={fontColor}>
						{title}
					</Text>
				</HStack>
				<MaterialCommunityIcons
					name={'chevron-right'}
					size={25}
					color={Colors.darkGray}
				/>
			</HStack>
			<Divider mx='3' thickness='0.3' bg={Colors.darkGray} />
		</TouchableOpacity >
	);
}

export default HomeMenuItem;