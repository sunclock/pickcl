import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { Image, Box, Center } from 'native-base';
import { Colors } from '../../styles/Colors';

interface ArtworkProp {
	track: ITrack,
	isDarkMode: boolean,
}

function Artwork({ track, isDarkMode }: ArtworkProp) {
	return (
		<Center alignSelf='center' borderRadius='20' style={styles.container}>
			<Box p='4'>
				{track.artwork
					? <Image style={styles.artwork} source={{ uri: track.artwork.uri }} alt={track.filename} />
					: <Image style={styles.artwork} source={{ uri: 'https://i.ibb.co/1fyhtQ1/Group-7-1.png' }} alt={track.filename} />
				}
			</Box>
		</Center>
	);
}

export default Artwork;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		width: width * 0.9,
		height: height / 1.8,
	},
	artwork: {
		width: 200,
		height: 200,
	},
});