import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { Image, Box, Center } from 'native-base';
import { Colors } from '../../styles/Colors';

interface BottomTabProp {
	track: ITrack,
	isDarkMode: boolean,
}

function BottomTab({ track, isDarkMode }: BottomTabProp) {
	return (
		<Center alignSelf='center' borderRadius='20' style={styles.container}>
			<Box p='4'>
			</Box>
		</Center>
	);
}

export default BottomTab;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
	},
});