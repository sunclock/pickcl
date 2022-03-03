import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { Image, Box, Center } from 'native-base';

interface ArtworkProps {
	track: ITrack,
}

function Artwork({ track }: ArtworkProps) {
	return (
		<Center alignSelf='center' borderRadius='20' style={styles.container}>
			<Box p='4'>
				{track.artwork
					? <Image style={styles.artwork} source={{ uri: track.artwork.uri }} alt={track.filename} />
					: <Image style={styles.artwork} source={{ uri: 'https://i.ibb.co/dP3D7wB/library-music.png' }} alt={track.filename} />
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
		backgroundColor: '#f5f5f5'
	},
	artwork: {
		width: 200,
		height: 200,
	},
});