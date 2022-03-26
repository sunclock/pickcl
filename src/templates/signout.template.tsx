import React from 'react';
import { useColorScheme, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Center, Heading } from 'native-base';
import { Colors } from '../styles/Colors';
import DividerWithText from '../components/DividerWithText';
import { SignOutScreenProp, SignOutScreenRouteProp } from '../navigation/AppNavigator';
import SignOutButton from '../sections/auth/SignOut.Button';
import ColorButton from '../components/ColorButton';

interface SignOutProp {
	navigation: SignOutScreenProp;
}

function SignOut({ navigation }: SignOutProp) {
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	};
	return (
		<KeyboardAvoidingView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Center>
				<Heading mb='6' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
					정말로 로그아웃 하시겠습니까?
				</Heading>
				<SignOutButton navigation={navigation} />
				<DividerWithText text={'또는'} />
				<ColorButton onPress={() => navigation.navigate('TrackList')} text='트랙리스트로 돌아가기' />
			</Center>
		</KeyboardAvoidingView >
	);
}

export default SignOut;