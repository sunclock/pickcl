import React from 'react';
import { useColorScheme, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Colors } from '../styles/Colors';
import { Box, Center, Heading, HStack, Text } from 'native-base';
import { HomeScreenProp, HomeScreenRouteProp } from '../navigation/AppNavigator';
import Header from '../components/Header';
import HomeMenu from '../sections/home/Home.MenuItem';
import HomeAlbumList from '../sections/home/Home.AlbumList';
import HomeMenuList from '../sections/home/Home.MenuList';

interface HomeProp {
	navigation: HomeScreenProp;
	route: HomeScreenRouteProp;
}
function Home({ navigation, route }: HomeProp) {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		paddingBottom: StatusBar.currentHeight,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Header title={'홈'} navigation={navigation} />
			<Box justifyContent={'space-evenly'} m='1' p='1'>
				<HomeMenuList navigation={navigation} />
				<Box m='2' p='1'>
					<Text fontSize={'lg'} fontWeight='bold'>내 리스트</Text>
				</Box>
				<HomeAlbumList navigation={navigation} />
			</Box>
		</SafeAreaView>
	);
}

export default Home;