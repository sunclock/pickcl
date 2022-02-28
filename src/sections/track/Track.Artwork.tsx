import React, { ReactNode } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { Image, Text, Box } from 'native-base';

interface ArtworkProps {
	track: ITrack,
	// children: ReactNode[] | ReactNode;
}

function Artwork({ track }: ArtworkProps) {
	return (
		<Box my='2' p='4' borderRadius='10' backgroundColor='#f5f5f5' style={styles.container} justifyContent='center' alignItems='center'>
			{track.artwork
				? <Image style={styles.artwork} source={{ uri: track.artwork.uri }} alt={track.filename} />
				: <Image style={styles.artwork} source={{ uri: 'https://i.ibb.co/dP3D7wB/library-music.png' }} alt={track.filename} />
			}
		</Box>
	);
}

export default Artwork;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		width: width - 20,
		height: height / 2,
	},
	artwork: {
		width: 200,
		height: 200,
	},
});