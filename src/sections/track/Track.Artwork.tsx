import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { Image, Box, Center } from 'native-base';

interface ArtworkProp {
	track: ITrack,
	isDarkMode: boolean,
}

function Artwork({ track }: ArtworkProp) {
	return (
		<Center alignSelf='center' style={styles.container}>
			<Box pl='4'>
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
		width: width * 0.93,
		height: height / 2,
	},
	artwork: {
		width: width * 0.5,
		height: width * 0.5,
	},
});