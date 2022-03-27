import {
	DramaActionTypes,
	DramaState,
	StoreDramaAction,
	DramaLoadingAction,
} from './drama.action.types';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = () => {
	let initialData = {
		dramas: {},
		isFirstOpen: true,
		isLoading: false,
		error: null,
	};
	async function getDataFromStorage() {
		const data = await AsyncStorage.getItem('drama');
		if (data) {
			let parsedData = JSON.parse(data);
			initialData = parsedData.data;
		}
	}
	getDataFromStorage();
	return initialData;
}

export const dramas = (
	state: DramaState = initialState(),
	action: StoreDramaAction | DramaLoadingAction
) => {
	const newState: DramaState = _.cloneDeep(state);
	switch (action.type) {
		case DramaActionTypes.DRAMA_LOADING:
			newState.isLoading = true;
			return newState;
		case DramaActionTypes.STORE_DRAMA:
			newState.isLoading = false;
			newState.isFirstOpen = false;
			newState.dramas = action.payload;
			return newState;
		default:
			return state;
	}
}

