import { Box, Text } from 'native-base';
import React, { ReactElement } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../styles/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HomeAlbumItemProp {
	uri: string | undefined;
	title: string;
	onPress: Function;
	isDarkMode: boolean;
	iconName: string | undefined;
}

function HomeAlbumItem({ uri, title, onPress, isDarkMode, iconName }: HomeAlbumItemProp) {
	let boxSize = width / 2.4;
	let borderColor = isDarkMode ? Colors.darkGray : Colors.gray;
	let fontColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	uri = uri ? uri : 'https://firebasestorage.googleapis.com/v0/b/pickcl.appspot.com/o/recording-room.jpg?alt=media&token=294cc6df-7561-44d1-92c0-966c3f3aacac';
	return (
		<TouchableOpacity onPress={() => onPress()} style={{ margin: 10, padding: 3 }}>
			{iconName
				? <Ionicons name={iconName} size={boxSize} color={borderColor} />
				: <Image source={{ uri }} style={{ width: boxSize, height: boxSize, borderWidth: 1, borderColor: borderColor, borderRadius: 5 }} />
			}
			<Text mt='1' fontSize={'md'} color={fontColor}>{title}</Text>
		</TouchableOpacity>
	);
}

export default HomeAlbumItem;

const { width, height } = Dimensions.get('window');
