import {
	PickActionTypes,
	PicksState,
	AddPickAction,
	RemovePickAction,
	EditPickMemoAction,
	EditPickVoiceActorsAction,
} from './pick.action.types';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveDataToStorage } from '../../utils/Tools';

export const initialState: PicksState = {
	picks: []
};

export const picks = (
	state: PicksState = initialState,
	action: AddPickAction | RemovePickAction | EditPickMemoAction | EditPickVoiceActorsAction
) => {
	const newState: PicksState = _.cloneDeep(state);
	// const loadPicks = async () => {
	// 	const picks = await AsyncStorage.getItem('picks');
	// 	if (!picks) {
	// 		return initialState;
	// 	}
	// 	let parsedPicks = JSON.parse(picks);
	// 	return (initialState.picks = parsedPicks.data)
	// }
	// loadPicks();
	switch (action.type) {
		case PickActionTypes.ADD_PICK:
			newState.picks = newState.picks.concat(action.payload);
			newState.picks.sort((a, b) => a.timestamp - b.timestamp);
			saveDataToStorage('picks', newState);
			return newState;
		case PickActionTypes.REMOVE_PICK:
			newState.picks = newState.picks.filter(pick => pick.id !== action.payload.pickId);
			saveDataToStorage('picks', newState);
			return newState;
		case PickActionTypes.EDIT_PICK_MEMO:
			newState.picks = newState.picks.map(pick => {
				if (pick.id === action.payload.pickId) {
					pick.memo = action.payload.memo;
				}
				return pick;
			});
			saveDataToStorage('picks', newState);
			return newState;
		case PickActionTypes.EDIT_PICK_VOICE_ACTORS:
			newState.picks = newState.picks.map(pick => {
				if (pick.id === action.payload.pickId) {
					pick.voiceActors = action.payload.voiceActors;
				}
				return pick;
			});
			saveDataToStorage('picks', newState);
			return newState;
		default:
			return newState;
	}
}