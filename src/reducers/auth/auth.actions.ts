import {
	AuthActionTypes,
	SignInAction,
	SignOutAction,
} from './auth.action.types';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const SignInRealName = (user: FirebaseAuthTypes.User): SignInAction => ({
	type: AuthActionTypes.SIGNIN,
	payload: user
});

export const SignOutAccount = (): SignOutAction => {
	auth()
		.signOut()
		.then(() => console.log('User signed out!'));
	return {
		type: AuthActionTypes.SIGN_OUT
	}
}