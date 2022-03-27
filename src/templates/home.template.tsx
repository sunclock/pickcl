import React from 'react';
import { useColorScheme, StatusBar, SafeAreaView } from 'react-native';
import { Colors } from '../styles/Colors';
import { Box, Heading } from 'native-base';
import { HomeScreenProp } from '../navigation/AppNavigator';
import Header from '../components/Header';
import HomeAlbumList from '../sections/home/Home.AlbumList';
import HomeMenuList from '../sections/home/Home.MenuList';

interface HomeProp {
	navigation: HomeScreenProp;
}
function Home({ navigation }: HomeProp) {
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
					<Heading fontSize={'lg'} color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>내 리스트</Heading>
				</Box>
				<HomeAlbumList navigation={navigation} isDarkMode={isDarkMode} />
			</Box>
		</SafeAreaView>
	);
}

export default Home;