import { Box, Text } from 'native-base';
import React from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/Colors';

interface HomeAlbumItemProp {
	uri: string | undefined;
	title: string;
	onPress: Function;
	isDarkMode: boolean;
}

function HomeAlbumItem({ uri, title, onPress, isDarkMode }: HomeAlbumItemProp) {
	let boxSize = width / 2.4;
	let imageSize = boxSize * 0.8;
	uri = uri ? uri : 'https://i.ibb.co/1fyhtQ1/Group-7-1.png';
	return (
		<TouchableOpacity onPress={() => onPress()} style={{ margin: 10, padding: 3 }}>
			<Box w={boxSize} h={boxSize} borderWidth={0.5} borderColor={Colors.darkGray} borderRadius={'md'} alignItems={'center'} justifyContent={'center'}>
				<Image
					style={{ width: imageSize, height: imageSize }}
					source={{ uri }}
				/>
			</Box>
			<Text mt='1' fontSize={'md'} color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>{title}</Text>
		</TouchableOpacity>
	);
}

export default HomeAlbumItem;

const { width, height } = Dimensions.get('window');
