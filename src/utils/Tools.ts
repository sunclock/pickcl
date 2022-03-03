import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveDataToStorage = (name: string, data: any) => {
	AsyncStorage.setItem(
		name,
		JSON.stringify({
			data,
		}),
	);
};
