import { ITrackList, IImage, ITrack } from '../../types';

export enum TrackListActionTypes {
	ADD_TRACKLIST = 'ADD_TRACKLIST',
	REMOVE_TRACKLIST = 'REMOVE_TRACKLIST',
	ADD_TRACK_TO_TRACKLIST = 'ADD_TRACK_TO_TRACKLIST',
	REMOVE_TRACK_FROM_TRACKLIST = 'REMOVE_TRACK_FROM_TRACKLIST',
	EDIT_TRACKLIST_TRACK_ORDER = 'EDIT_TRACKLIST_TRACK_ORDER',
	EDIT_TRACKLIST_TITLE = 'EDIT_TRACKLIST_TITLE',
	EDIT_TRACKLIST_DESCRIPTION = 'EDIT_TRACKLIST_DESCRIPTION',
	EDIT_TRACKLIST_ARTWORK = 'EDIT_TRACKLIST_ARTWORK',
	EDIT_TRACKLIST_VOICE_ACTORS = 'EDIT_TRACKLIST_VOICE_ACTORS',
	RESET_TRACKLIST = 'RESET_TRACKLIST'
}

export type AddTrackListAction = {
	type: TrackListActionTypes.ADD_TRACKLIST;
	payload: ITrackList;
};

export type RemoveTrackListAction = {
	type: TrackListActionTypes.REMOVE_TRACKLIST;
	payload: {
		tracklistId: string | number;
	}
};

export type AddTrackToTrackListAction = {
	type: TrackListActionTypes.ADD_TRACK_TO_TRACKLIST;
	payload: {
		tracklistId: string | number;
		tracks: ITrack[];
	}
};

export type RemoveTrackFromTrackListAction = {
	type: TrackListActionTypes.REMOVE_TRACK_FROM_TRACKLIST;
	payload: {
		tracklistId: string | number;
		trackId: string | number;
	}
};

export type EditTrackListTrackOrderAction = {
	type: TrackListActionTypes.EDIT_TRACKLIST_TRACK_ORDER;
	payload: {
		tracklistId: string | number;
		tracks: ITrack[];
	}
};

export type EditTrackListTitleAction = {
	type: TrackListActionTypes.EDIT_TRACKLIST_TITLE;
	payload: {
		tracklistId: string | number;
		title: string;
	}
};

export type EditTrackListDescriptionAction = {
	type: TrackListActionTypes.EDIT_TRACKLIST_DESCRIPTION;
	payload: {
		tracklistId: string | number;
		description: string;
	}
};

export type EditTrackListArtworkAction = {
	type: TrackListActionTypes.EDIT_TRACKLIST_ARTWORK;
	payload: {
		tracklistId: string | number;
		artwork: IImage;
	}
};

export type EditTrackListVoiceActorsAction = {
	type: TrackListActionTypes.EDIT_TRACKLIST_VOICE_ACTORS;
	payload: {
		tracklistId: string | number;
		voiceActors: string[];
	}
};

export type ResetTrackListAction = {
	type: TrackListActionTypes.RESET_TRACKLIST;
};

export type TrackListsState = {
	tracklists: ITrackList[];
};

export type AppState = {
	tracklists: TrackListsState;
};