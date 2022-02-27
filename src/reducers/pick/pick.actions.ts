import {
	PickActionTypes,
	AddPickAction,
	RemovePickAction,
	EditPickMemoAction,
	EditPickVoiceActorsAction,
} from './pick.action.types';

import { IPick, IVoiceActorList } from '../../types';

export const addPick = (pick: IPick): AddPickAction => ({
	type: PickActionTypes.ADD_PICK,
	payload: pick
});

export const removePick = (pickId: string | number): RemovePickAction => ({
	type: PickActionTypes.REMOVE_PICK,
	payload: {
		pickId
	}
});

export const editPickMemo = (pickId: string | number, memo: string): EditPickMemoAction => ({
	type: PickActionTypes.EDIT_PICK_MEMO,
	payload: {
		pickId,
		memo
	}
});

export const editPickVoiceActors = (pickId: string | number, voiceActors: IVoiceActorList): EditPickVoiceActorsAction => ({
	type: PickActionTypes.EDIT_PICK_VOICE_ACTORS,
	payload: {
		pickId,
		voiceActors
	}
});