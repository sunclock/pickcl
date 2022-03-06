import {
	PickActionTypes,
	PicksState,
	AddPickAction,
	RemovePickAction,
	EditPickMemoAction,
	EditPickVoiceActorsAction,
	ResetPickAction,
} from './pick.action.types';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = () => {
	let initialData = {
		picks: []
	};
	async function getDataFromStorage() {
		const data = await AsyncStorage.getItem('picks');
		if (data) {
			let parsedData = JSON.parse(data);
			initialData = parsedData.data;
		}
	}
	getDataFromStorage();
	return initialData;
};


export const picks = (
	state: PicksState = initialState(),
	action: AddPickAction | RemovePickAction | EditPickMemoAction | EditPickVoiceActorsAction | ResetPickAction
) => {
	const newState: PicksState = _.cloneDeep(state);
	switch (action.type) {
		case PickActionTypes.ADD_PICK:
			newState.picks = newState.picks.concat(action.payload);
			newState.picks.sort((a, b) => a.timestamp - b.timestamp);
			return newState;
		case PickActionTypes.REMOVE_PICK:
			newState.picks = newState.picks.filter(pick => pick.id !== action.payload.pickId);
			return newState;
		case PickActionTypes.EDIT_PICK_MEMO:
			newState.picks = newState.picks.map(pick => {
				if (pick.id === action.payload.pickId) {
					pick.memo = action.payload.memo;
				}
				return pick;
			});
			return newState;
		case PickActionTypes.EDIT_PICK_VOICE_ACTORS:
			newState.picks = newState.picks.map(pick => {
				if (pick.id === action.payload.pickId) {
					pick.voiceActors = action.payload.voiceActors;
				}
				return pick;
			});
			return newState;
		case PickActionTypes.RESET_PICK:
			newState.picks = [];
			return newState;
		default:
			return newState;
	}
}