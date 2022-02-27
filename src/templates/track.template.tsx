import React from 'react';
import { View, useColorScheme } from 'react-native';
import { VStack, HStack, Text, Button } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { addTrack } from '../reducers/track';

const SampleTrack = {
	id: '1',
	name: 'Track 1',
	artist: 'Artist 1',
	duration: 3,
	artwork: {
		uri: 'https://picsum.photos/200/300',
		filename: 'artwork.jpg',
	},
	filename: 'https://picsum.photos/200/300',
	uri: 'https://picsum.photos/200/300',
};

function Track({ }) {
	const tracks = useSelector(state => state.tracks.tracks);
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<VStack
			style={{
				backgroundColor: isDarkMode ? 'black' : 'white',
			}}>
			<Button onPress={() => console.log('button clicked')}>버튼 클릭하기</Button>
			<Button onPress={() => dispatch(addTrack([SampleTrack]))}>샘플 곡 추가하기</Button>
			<Button onPress={() => console.log(tracks)}>트랙 확인하기</Button>
			{tracks.map((track, index) => (
				<HStack key={index}>
					<Text>{track.name}</Text>
					<Text>{track.artist}</Text>
				</HStack>
			))}
		</VStack>
	);
}

export default Track;