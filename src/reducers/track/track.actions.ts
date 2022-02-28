import {
	TrackActionTypes,
	AddTrackAction,
	RemoveTrackAction,
	EditTrackTitleAction,
	EditTrackSeasonAction,
	EditTrackEpisodeAction,
	EditTrackArtworkAction,
	EditTrackVoiceActorsAction
} from './track.action.types';
import { IVoiceActor, IImage, ITrack } from '../../types';

export const addTrack = (tracks: ITrack[]): AddTrackAction => ({
	type: TrackActionTypes.ADD_TRACK,
	payload: tracks
});

export const removeTrack = (trackId: string | number): RemoveTrackAction => ({
	type: TrackActionTypes.REMOVE_TRACK,
	payload: {
		trackId
	}
});

export const editTrackTitle = (trackId: string | number, title: string): EditTrackTitleAction => ({
	type: TrackActionTypes.EDIT_TRACK_TITLE,
	payload: {
		trackId,
		title
	}
});

export const editTrackSeason = (trackId: string | number, season: number | string): EditTrackSeasonAction => ({
	type: TrackActionTypes.EDIT_TRACK_SEASON,
	payload: {
		trackId,
		season
	}
});

export const editTrackEpisode = (trackId: string | number, episode: number | string): EditTrackEpisodeAction => ({
	type: TrackActionTypes.EDIT_TRACK_EPISODE,
	payload: {
		trackId,
		episode
	}
});

export const editTrackArtwork = (trackId: string | number, artwork: IImage): EditTrackArtworkAction => ({
	type: TrackActionTypes.EDIT_TRACK_ARTWORK,
	payload: {
		trackId,
		artwork
	}
});

export const editTrackVoiceActors = (trackId: string | number, voiceActors: IVoiceActor[]): EditTrackVoiceActorsAction => ({
	type: TrackActionTypes.EDIT_TRACK_VOICE_ACTORS,
	payload: {
		trackId,
		voiceActors
	}
});