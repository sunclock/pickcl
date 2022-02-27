import {
	TracksState,
	TrackActionTypes,
	AddTrackAction,
	RemoveTrackAction,
	EditTrackTitleAction,
	EditTrackSeasonAction,
	EditTrackEpisodeAction,
	EditTrackArtworkAction,
	EditTrackVoiceActorsAction
} from './track.action.types';
import _ from 'lodash';

export const initialState: TracksState = {
	tracks: []
};

export const tracks = (
	state: TracksState = initialState,
	action: AddTrackAction | RemoveTrackAction | EditTrackTitleAction | EditTrackSeasonAction | EditTrackEpisodeAction | EditTrackArtworkAction | EditTrackVoiceActorsAction
) => {
	const newState: TracksState = _.cloneDeep(state);
	switch (action.type) {
		case TrackActionTypes.ADD_TRACK:
			newState.tracks = newState.tracks.concat(action.payload);
			return newState;
		case TrackActionTypes.REMOVE_TRACK:
			newState.tracks = newState.tracks.filter(track => track.id !== action.payload.trackId);
			return newState;
		case TrackActionTypes.EDIT_TRACK_TITLE:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.title = action.payload.title;
				}
				return track;
			}
			);
			return newState;
		case TrackActionTypes.EDIT_TRACK_SEASON:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.season = action.payload.season;
				}
				return track;
			}
			);
			return newState;
		case TrackActionTypes.EDIT_TRACK_EPISODE:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.episode = action.payload.episode;
				}
				return track;
			}
			);
			return newState;
		case TrackActionTypes.EDIT_TRACK_ARTWORK:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.artwork = action.payload.artwork;
				}
				return track;
			}
			);
			return newState;
		case TrackActionTypes.EDIT_TRACK_VOICE_ACTORS:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.voiceActors = action.payload.voiceActors;
				}
				return track;
			}
			);
			return newState;
		default:
			return newState;
	}
};