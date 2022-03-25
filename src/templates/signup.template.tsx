import React from 'react';
import { useColorScheme, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Stack, Center, Heading, Text, Divider } from 'native-base';
import { Colors } from '../styles/Colors';
import { SignInScreenProp, SignInScreenRouteProp } from '../navigation/RootNavigator';
import SignUpEmailAndPassword from '../sections/auth/SignUp.EmailAndPassword';

interface SignUpProp {
	navigation: SignInScreenProp;
	route: SignInScreenRouteProp;
}
function SignUp({ navigation, route }: SignUpProp) {
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
				<Heading mb='8' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
					피클에 회원가입하기
				</Heading>
				<SignUpEmailAndPassword isDarkMode={isDarkMode} navigation={navigation} />
			</Center>
		</KeyboardAvoidingView >
	);
}

export default SignUp;