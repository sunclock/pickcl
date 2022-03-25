import React from 'react';
import { useColorScheme, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Stack, Center, Heading, Text, Divider } from 'native-base';
import { Colors } from '../styles/Colors';
import MonotoneButton from '../components/MonotoneButton';
import SignInEmailAndPassword from '../sections/auth/SignIn.EmailAndPassword';
import Header from '../components/Header';
import DividerWithText from '../components/DividerWithText';
import { SignInScreenProp, SignInScreenRouteProp } from '../navigation/RootNavigator';
import ColorButton from '../components/ColorButton';

interface SignInProp {
	navigation: SignInScreenProp;
	route: SignInScreenRouteProp;
}
function SignIn({ navigation, route }: SignInProp) {
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
					피클에 로그인하기
				</Heading>
				<SignInEmailAndPassword isDarkMode={isDarkMode} navigation={navigation} />
				<DividerWithText text={'또는'} />
				<MonotoneButton onPress={() => console.log('구글로 로그인')} text='G 구글로 로그인' />
				<MonotoneButton onPress={() => console.log('트위터로 로그인')} text='트위터로 로그인' />
			</Center>
		</KeyboardAvoidingView >
	);
}

export default SignIn;