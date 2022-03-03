import {
	TracksState,
	TrackActionTypes,
	AddTrackAction, EditTrackArtworkAction, EditTrackEpisodeAction, EditTrackVoiceActorsAction, RemoveTrackAction,
	EditTrackSeasonAction, EditTrackTitleAction, ChangeTrackAction, ChangeQueueAction,
} from './track.action.types';
import _ from 'lodash';
import { saveDataToStorage } from '../../utils/Tools';
import { SampleTrack } from '../../templates/sample';

export const initialState: TracksState = {
	tracks: [],
	currentTrack: SampleTrack,
	currentQueue: [],
	isPlaying: false,
};

export const tracks = (
	state: TracksState = initialState,
	action: AddTrackAction | RemoveTrackAction | EditTrackTitleAction | EditTrackArtworkAction |
		EditTrackArtworkAction | EditTrackEpisodeAction | EditTrackSeasonAction | EditTrackVoiceActorsAction |
		ChangeTrackAction | ChangeQueueAction
) => {
	const newState: TracksState = _.cloneDeep(state);
	// const loadTracks = async () => {
	// 	const tracks = await AsyncStorage.getItem('tracks');
	// 	if (!tracks) {
	// 		return initialState;
	// 	}
	// 	let parsedTracks = JSON.parse(tracks);
	// 	initialState.tracks = parsedTracks.data.tracks;
	// 	initialState.currentTrack = parsedTracks.data.currentTrack;
	// 	initialState.currentQueue = parsedTracks.currentQueue;
	// 	return initialState;
	// }
	// loadTracks();
	switch (action.type) {
		case TrackActionTypes.ADD_TRACK:
			if (action.payload) {
				newState.tracks = newState.tracks.concat(action.payload);
				saveDataToStorage('tracks', newState);
			}
			return newState;
		case TrackActionTypes.REMOVE_TRACK:
			newState.tracks = newState.tracks.filter(track => track.id !== action.payload.trackId);
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.EDIT_TRACK_TITLE:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.title = action.payload.title;
				}
				return track;
			}
			);
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.EDIT_TRACK_SEASON:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.season = action.payload.season;
				}
				return track;
			}
			);
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.EDIT_TRACK_EPISODE:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.episode = action.payload.episode;
				}
				return track;
			}
			);
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.EDIT_TRACK_ARTWORK:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.artwork = action.payload.artwork;
				}
				return track;
			}
			);
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.EDIT_TRACK_VOICE_ACTORS:
			newState.tracks = newState.tracks.map(track => {
				if (track.id === action.payload.trackId) {
					track.voiceActors = action.payload.voiceActors;
				}
				return track;
			}
			);
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.CHANGE_TRACK:
			newState.currentTrack = action.payload;
			saveDataToStorage('tracks', newState);
			return newState;
		case TrackActionTypes.CHANGE_QUEUE:
			newState.currentQueue = action.payload;
			saveDataToStorage('tracks', newState);
			return newState;
		default:
			return newState;
	}
};