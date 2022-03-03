import AsyncStorage from '@react-native-async-storage/async-storage';

//Create dataStorage
export const saveDataToStorage = (name, data) => {
	AsyncStorage.setItem(
		name,
		JSON.stringify({
			data,
		}),
	);
};
