import { IPick, IVoiceActor } from '../../types';

export enum PickActionTypes {
	ADD_PICK = 'ADD_PICK',
	REMOVE_PICK = 'REMOVE_PICK',
	EDIT_PICK_MEMO = 'EDIT_PICK_MEMO',
	EDIT_PICK_VOICE_ACTORS = 'EDIT_PICK_VOICE_ACTORS',
	RESET_PICK = 'RESET_PICK',
}

export type AddPickAction = {
	type: PickActionTypes.ADD_PICK;
	payload: IPick;
};

export type RemovePickAction = {
	type: PickActionTypes.REMOVE_PICK;
	payload: {
		pickId: string | number;
	}
};

export type EditPickMemoAction = {
	type: PickActionTypes.EDIT_PICK_MEMO;
	payload: {
		pickId: string | number;
		memo: string;
	}
};

export type EditPickVoiceActorsAction = {
	type: PickActionTypes.EDIT_PICK_VOICE_ACTORS;
	payload: {
		pickId: string | number;
		voiceActors: IVoiceActor[];
	}
};

export type ResetPickAction = {
	type: PickActionTypes.RESET_PICK;
};

export type PicksState = {
	picks: IPick[];
};

export type AppState = {
	picks: PicksState;
}