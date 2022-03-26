import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthActionTypes {
	SIGNIN_ANONYMOUS = 'SIGNIN_ANONYMOUS',
	SIGNIN = 'SIGNIN',
	SIGN_OUT = 'SIGN_OUT',
}

export type SignInAnonymousAction = {
	type: AuthActionTypes.SIGNIN_ANONYMOUS;
	payload: FirebaseAuthTypes.User;
};

export type SignInAction = {
	type: AuthActionTypes.SIGNIN;
	payload: FirebaseAuthTypes.User;
};

export type SignOutAction = {
	type: AuthActionTypes.SIGN_OUT;
};

export type AuthState = {
	user: FirebaseAuthTypes.User;
	isLoggedIn: boolean;
};

export type AppState = {
	auth: AuthState;
}