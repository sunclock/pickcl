import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export enum AuthActionTypes {
	SIGNIN = 'SIGNIN',
	SIGN_OUT = 'SIGN_OUT',
}

export type SignInAction = {
	type: AuthActionTypes.SIGNIN;
	payload: FirebaseAuthTypes.User;
};

export type SignOutAction = {
	type: AuthActionTypes.SIGN_OUT;
};

export type AuthState = {
	user: null | FirebaseAuthTypes.User;
	isLoggedIn: boolean;
};

export type AppState = {
	auth: AuthState;
}