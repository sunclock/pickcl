import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from '../../styles/Colors';
import { TrackListScreenProp, TrackScreenProp } from '../../navigation/RootNavigator';
import MonotoneButton from '../../components/MonotoneButton';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';
import { useDispatch } from 'react-redux';
import { SignOutAccount } from '../../reducers/auth';
import { SignOutScreenProp } from '../../navigation/AppNavigator';

interface SignOutButtonProp {
	navigation: SignOutScreenProp;
}
function SignOutButton({ navigation }: SignOutButtonProp) {
	const dispatch = useDispatch()
	function onSignOutPress() {
		dispatch(SignOutAccount())
		navigation.navigate('Auth');
	}
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<MonotoneButton onPress={() => onSignOutPress()} text='로그아웃' />
	);
}

export default SignOutButton;