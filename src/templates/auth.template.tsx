import React, { useEffect, useRef, useState } from 'react';
import { useColorScheme, StatusBar, Dimensions, StyleSheet, Animated, SafeAreaView, FlatList, ScrollView, Platform } from 'react-native';
import { Colors } from '../styles/Colors';
import { AuthScreenProp, AuthScreenRouteProp } from '../navigation/RootNavigator';
import { Box, Center, Container, Divider, Flex, Heading, HStack, Text, VStack } from 'native-base';
import ActorsPreview from '../sections/auth/Auth.ActorsPreview';
import MonotoneButton from '../components/MonotoneButton';
import DividerWithText from '../components/DividerWithText';
import ColorButton from '../components/ColorButton';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';

interface AuthProp {
	navigation: AuthScreenProp;
	route: AuthScreenRouteProp;
}
function Auth({ navigation, route }: AuthProp) {
	const fadeAnim = useRef(new Animated.Value(0)).current;
	const [isFaded, setIsFaded] = useState(false);
	const [index, setIndex] = useState(0);
	const changeIndex = () => {
		if (index < 8) {
			setIndex(index + 1);
		} else {
			setIndex(0);
		}
	}
	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();
		setTimeout(() => {
			setIsFaded(true);
		}, 3000);
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
		setTimeout(() => {
			setIsFaded(false);
		}, 300);
	}

	useEffect(() => {
		fadeIn();
	}, []);

	useEffect(() => {
		if (isFaded) {
			fadeOut();
		} else {
			fadeIn();
			changeIndex();
		}
	}, [isFaded]);

	async function onAppleButtonPress() {
		// performs login request
		const appleAuthRequestResponse = await appleAuth.performRequest({
			requestedOperation: appleAuth.Operation.LOGIN,
			requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
		});

		// get current authentication state for user
		// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
		const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

		// use credentialState response to ensure the user is authenticated
		if (credentialState === appleAuth.State.AUTHORIZED) {
			// user is authenticated
		}
	}

	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Center>
				<Heading mb='2' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
					오늘 듣고 싶은 드라마가 있나요?
				</Heading>
				<Heading mb='4' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
					지금 <Text color={isDarkMode ? Colors.dark.primary : Colors.primary}>Pickcl</Text>에서 들어보세요!
				</Heading>
				<Animated.View style={{ opacity: fadeAnim }}>
					<ActorsPreview index={index} isDarkMode={isDarkMode} />
				</Animated.View>
			</Center>
			<MonotoneButton onPress={() => navigation.navigate('Auth')} text='G 구글로 회원가입' />
			<MonotoneButton onPress={() => navigation.navigate('Auth')} text='트위터로 회원가입' />
			<ColorButton onPress={() => navigation.navigate('SignUp')} text='이메일로 회원가입' />
			{Platform.OS === 'ios' &&
				<AppleButton
					buttonStyle='AppleButton.Style.WHITE'
					buttonType='AppleButton.Type.SIGN_IN'
					style={{ width: 300, height: 50 }}
					onPress={() => onAppleButtonPress()} />
			}
			<Divider w="300" m="4" />
			<Text mb="4" fontSize={'md'} fontWeight={'extrabold'} color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>이미 계정이 있나요?</Text>
			<ColorButton onPress={() => navigation.navigate('SignIn')} text='로그인' />
		</SafeAreaView>
	);
}

export default Auth;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	image: {
		width: width * 0.5,
		height: width * 0.5,
	},
});