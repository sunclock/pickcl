import {
	AuthActionTypes,
	SignInAnonymousAction,
	SignInAction,
	SignOutAction,
} from './auth.action.types';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const SignInAnonymous = (user: FirebaseAuthTypes.User): SignInAnonymousAction => ({
	type: AuthActionTypes.SIGNIN_ANONYMOUS,
	payload: user
});

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