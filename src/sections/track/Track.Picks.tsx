import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { IPick, ITrack } from '../../types';
import { VStack, Text, Box } from 'native-base';

interface PicksProps {
	track: ITrack,
	picks: IPick[],
	// children: ReactNode[] | ReactNode;
}

const { width, height } = Dimensions.get('window');

function Picks({ track, picks }: PicksProps) {
	return (
		<Box my='2' p='4' borderRadius='10' style={styles.container}>
			{picks
				? picks.map((pick, index) =>
					<TouchableOpacity
						key={index}
						onPress={() => console.log(pick.memo, '를 누르셨어요')}>
						<Text key={index}>{pick.memo}</Text>
					</TouchableOpacity>)
				: <Text>아직 나만의 픽이 없어요!</Text>
			}
		</Box>
	);
}

export default Picks;

const styles = StyleSheet.create({
	container: {
		width: width - 20,
		height: height / 2,
		backgroundColor: '#f5f5f5',
	},
});