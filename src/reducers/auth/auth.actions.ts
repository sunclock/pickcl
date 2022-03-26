import {
	AuthActionTypes,
	SignInAnonymousAction,
	SignInAction,
	SignOutAction,
} from './auth.action.types';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const SignInAnonymous = (): SignInAnonymousAction => {
	auth()
		.signInAnonymously()
		.then(() => {
			console.log('User signed in anonymously');
		})
		.catch(error => {
			if (error.code === 'auth/operation-not-allowed') {
				console.log('Enable anonymous in your firebase console.');
			}
			console.error(error);
		});
	const user = auth().currentUser as FirebaseAuthTypes.User;
	return {
		type: AuthActionTypes.SIGNIN_ANONYMOUS,
		payload: user
	};
};

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