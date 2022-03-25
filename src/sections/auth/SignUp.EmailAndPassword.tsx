import React, { useState } from 'react';
import { Text, Box, Input, FormControl, WarningOutlineIcon, Divider, Button } from 'native-base';
import { Colors } from '../../styles/Colors';
import MonotoneButton from '../../components/MonotoneButton';
import { SignInScreenProp } from '../../navigation/RootNavigator';
import ColorButton from '../../components/ColorButton';

interface SignUpEmailAndPasswordProp {
	isDarkMode: boolean;
	navigation: SignInScreenProp;
}

function SignUpEmailAndPassword({ isDarkMode, navigation }: SignUpEmailAndPasswordProp) {
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
			<ColorButton onPress={() => console.log('이메일과 비밀번호로 회원가입')} text='다음' />
			<Divider />
		</Box>
	);
}

export default SignUpEmailAndPassword;