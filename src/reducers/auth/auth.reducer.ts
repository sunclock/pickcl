import {
	AuthActionTypes,
	SignInAnonymousAction,
	SignInAction,
	SignOutAction,
	AuthState,
} from './auth.action.types';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export const initialState = () => {
	let initialData = {
		user: {} as FirebaseAuthTypes.User,
	};
	async function getDataFromStorage() {
		const data = await AsyncStorage.getItem('user');
		if (data) {
			let parsedData = JSON.parse(data);
			initialData = parsedData.data;
		}
	}
	getDataFromStorage();
	return initialData;
};

async function storeUser(user: FirebaseAuthTypes.User) {
	await AsyncStorage.setItem('user', JSON.stringify(user));
}

export const auth = (
	state: AuthState = initialState(),
	action: SignInAnonymousAction | SignInAction | SignOutAction
) => {
	const newState: AuthState = _.cloneDeep(state);
	switch (action.type) {
		case AuthActionTypes.SIGNIN_ANONYMOUS:
			storeUser(action.payload);
			newState.user = action.payload;
			return newState;
		case AuthActionTypes.SIGNIN:
			storeUser(action.payload);
			newState.user = action.payload;
			return newState;
		case AuthActionTypes.SIGN_OUT:
			newState.user = {} as FirebaseAuthTypes.User;
			return newState;
		default:
			return newState;
	}
}