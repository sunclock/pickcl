import React from 'react';
import { useColorScheme, KeyboardAvoidingView, StatusBar } from 'react-native';
import { Center, Heading } from 'native-base';
import { Colors } from '../styles/Colors';
import MonotoneButton from '../components/MonotoneButton';
import SignInEmailAndPassword from '../sections/auth/SignIn.EmailAndPassword';
import DividerWithText from '../components/DividerWithText';
import { SignInScreenProp, SignInScreenRouteProp } from '../navigation/RootNavigator';

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
				<MonotoneButton onPress={() => navigation.navigate('SignUp')} text={'이메일로 회원가입'} />
			</Center>
		</KeyboardAvoidingView >
	);
}

export default SignIn;