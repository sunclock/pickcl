import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar } from 'react-native';
import Header from '../components/Header';
import { FileScreenProp } from '../navigation/AppNavigator';
import { Colors } from '../styles/Colors';

interface FileProp {
	navigation: FileScreenProp;
}
function File({ navigation }: FileProp) {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		paddingBottom: StatusBar.currentHeight,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Header isDarkMode={isDarkMode} title={'파일'} navigation={navigation} />
		</SafeAreaView>
	);
}

export default File;