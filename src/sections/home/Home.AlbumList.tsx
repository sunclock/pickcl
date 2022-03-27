import { Box, HStack, Text } from 'native-base';
import React from 'react';
import { Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';
import { HomeScreenProp } from '../../navigation/AppNavigator';
import HomeAlbumItem from './Home.AlbumItem';

interface HomeAlbumListProp {
	navigation: HomeScreenProp;
}

const renderItem = (item: any, navigation: HomeScreenProp) => {
	return (
		<HomeAlbumItem
			key={item.id}
			title={item.title}
			uri={item.uri}
			onPress={() => navigation.navigate('Album', { album: item })}
		/>
	);
};


function HomeAlbumList({ navigation }: HomeAlbumListProp) {
	return (
		<>
			<FlatList
				data={[
					{
						id: '1',
						title: 'Album 1',
					},
					{
						id: '2',
						title: 'Album 2',
					},
					{
						id: '3',
						title: 'Album 3',
					},
					{
						id: '4',
						title: 'Album 4',
					},
					{
						id: '5',
						title: 'Album 5',
					},
					{
						id: '6',
						title: 'Album 6',
					},
					{
						id: '7',
						title: 'Album 7',
					},
				]}
				renderItem={({ item }) => renderItem(item, navigation)}
				numColumns={2}
				keyExtractor={(item) => item.id}
			/>
		</>
	);
}

export default HomeAlbumList;
