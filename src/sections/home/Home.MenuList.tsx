import React from 'react';
import { HomeScreenProp } from '../../navigation/AppNavigator';
import HomeMenuItem from './Home.MenuItem';

interface HomeMenuListProp {
	navigation: HomeScreenProp;
}

function HomeMenuList({ navigation }: HomeMenuListProp) {
	return (
		<>
			<HomeMenuItem title={'재생 중인 목록'} iconName={'playlist-music'} onPress={() => {
				navigation.navigate('TrackList');
			}} />
			<HomeMenuItem title={'오디오 드라마'} iconName={'drama-masks'} onPress={() => {
				navigation.navigate('TrackList');
			}} />
			<HomeMenuItem title={'파일'} iconName={'file-music'} onPress={() => {
				navigation.navigate('TrackList');
			}} />
		</>
	);
}

export default HomeMenuList;