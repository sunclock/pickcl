import {
	PickActionTypes,
	PicksState,
	AddPickAction,
	RemovePickAction,
	EditPickMemoAction,
	EditPickVoiceActorsAction,
} from './pick.action.types';
import _ from 'lodash';

export const initialState: PicksState = {
	picks: []
};

export const picks = (
	state: PicksState = initialState,
	action: AddPickAction | RemovePickAction | EditPickMemoAction | EditPickVoiceActorsAction
) => {
	const newState: PicksState = _.cloneDeep(state);
	switch (action.type) {
		case PickActionTypes.ADD_PICK:
			newState.picks = newState.picks.concat(action.payload);
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
		default:
			return newState;
	}
}