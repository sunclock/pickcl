import {
	TracksState,
	TrackActionTypes,
	AddTrackAction, EditTrackArtworkAction, EditTrackEpisodeAction, EditTrackVoiceActorsAction, RemoveTrackAction,
	EditTrackSeasonAction, EditTrackTitleAction, ChangeTrackAction, ChangeQueueAction, ResetTrackAction, ChangeSkipIntervalAction,
} from './track.action.types';
import _ from 'lodash';
import { SampleTrack } from '../../assets/sample';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const initialState = () => {
	let initialData = {
		tracks: [],
		currentTrack: SampleTrack,
		currentQueue: [],
		isPlaying: false,
		settings: {
			skipInterval: 15,
		}
	}
	return initialData;
};

export const tracks = (
	state: TracksState = initialState(),
	action: AddTrackAction | RemoveTrackAction | EditTrackTitleAction | EditTrackArtworkAction |
		EditTrackArtworkAction | EditTrackEpisodeAction | EditTrackSeasonAction | EditTrackVoiceActorsAction |
		ChangeTrackAction | ChangeQueueAction | ResetTrackAction | ChangeSkipIntervalAction
) => {
	const newState: TracksState = _.cloneDeep(state);
	switch (action.type) {
		case TrackActionTypes.ADD_TRACK:
			if (action.payload) {
				newState.tracks = newState.tracks.concat(action.payload);
			}
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
		case TrackActionTypes.CHANGE_TRACK:
			newState.currentTrack = action.payload;
			return newState;
		case TrackActionTypes.CHANGE_QUEUE:
			newState.currentQueue = action.payload;
			return newState;
		case TrackActionTypes.RESET_TRACK:
			newState.currentTrack = SampleTrack;
			newState.tracks = [];
			return newState;
		case TrackActionTypes.CHANGE_SKIP_INTERVAL:
			newState.settings.skipInterval = action.payload;
			return newState;
		default:
			return newState;
	}
};