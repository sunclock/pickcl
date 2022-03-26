import React, { useState } from 'react';
import { Box, Input, FormControl, WarningOutlineIcon, Divider } from 'native-base';
import { Colors } from '../../styles/Colors';
import { SignInScreenProp } from '../../navigation/RootNavigator';
import ColorButton from '../../components/ColorButton';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

interface SignInEmailAndPasswordProp {
	isDarkMode: boolean;
	navigation: SignInScreenProp;
}

function SignInEmailAndPassword({ isDarkMode, navigation }: SignInEmailAndPasswordProp) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	function validateEmail(email: string) {
		setEmail(email);
		const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		setIsEmailValid(regex.test(String(email).toLowerCase()));
	}
	function validatePassword(password: string) {
		setPassword(password);
		setIsPasswordValid(password.length >= 6);
	}
	function loginUser() {
		auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('User account signed in!');
				navigation.navigate('TrackList');
			}
			).catch(error => {
				if (error.code === 'auth/wrong-password') {
					Alert.alert('비밀번호 오류',
						'비밀번호가 올바르지 않습니다.', [
						{ text: '확인' }
					]);
				}
				if (error.code === 'auth/user-not-found') {
					Alert.alert('이메일 오류',
						'존재하지 않는 이메일입니다.', [
						{ text: '확인' }
					])
				}
			});
	}
	return (
		<Box>
			<FormControl isInvalid={!isEmailValid} mb="5">
				<Input
					variant={'outline'}
					w="300"
					value={email}
					onChangeText={(text) => validateEmail(text)}
					placeholder="abc@naver.com"
					color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				/>
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
					abc@naver.com 형식으로 이메일을 작성해주세요.
				</FormControl.ErrorMessage>
			</FormControl>
			<FormControl isInvalid={!isPasswordValid} mb="5">
				<Input
					variant={'outline'}
					w="300"
					placeholder="password"
					type="password"
					value={password}
					onChangeText={(text) => validatePassword(text)}
					color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				/>
				<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
					6자 이상으로 비밀번호를 작성해주세요.
				</FormControl.ErrorMessage>
			</FormControl>
			<ColorButton onPress={() => loginUser()} text='다음' />
			<Divider />
		</Box>
	);
}

export default SignInEmailAndPassword;