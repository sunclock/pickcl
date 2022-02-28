import { ITrack, IImage, IVoiceActor } from '../../types';

export enum TrackActionTypes {
	ADD_TRACK = 'ADD_TRACK',
	REMOVE_TRACK = 'REMOVE_TRACK',
	EDIT_TRACK_TITLE = 'EDIT_TRACK_TITLE',
	EDIT_TRACK_SEASON = 'EDIT_TRACK_SEASON',
	EDIT_TRACK_EPISODE = 'EDIT_TRACK_EPISODE',
	EDIT_TRACK_ARTWORK = 'EDIT_TRACK_ARTWORK',
	EDIT_TRACK_VOICE_ACTORS = 'EDIT_TRACK_VOICE_ACTORS',
}

export type AddTrackAction = {
	type: TrackActionTypes.ADD_TRACK;
	payload: ITrack[];
};

export type RemoveTrackAction = {
	type: TrackActionTypes.REMOVE_TRACK;
	payload: {
		trackId: string | number;
	}
};

export type EditTrackTitleAction = {
	type: TrackActionTypes.EDIT_TRACK_TITLE;
	payload: {
		trackId: string | number;
		title: string;
	}
};

export type EditTrackSeasonAction = {
	type: TrackActionTypes.EDIT_TRACK_SEASON;
	payload: {
		trackId: string | number;
		season: number | string;
	}
};

export type EditTrackEpisodeAction = {
	type: TrackActionTypes.EDIT_TRACK_EPISODE;
	payload: {
		trackId: string | number;
		episode: number | string;
	}
};

export type EditTrackArtworkAction = {
	type: TrackActionTypes.EDIT_TRACK_ARTWORK;
	payload: {
		trackId: string | number;
		artwork: IImage;
	}
};

export type EditTrackVoiceActorsAction = {
	type: TrackActionTypes.EDIT_TRACK_VOICE_ACTORS;
	payload: {
		trackId: string | number;
		voiceActors: IVoiceActor[];
	}
};

export type TracksState = {
	tracks: ITrack[];
};

export type AppState = {
	tracks: TracksState;
};