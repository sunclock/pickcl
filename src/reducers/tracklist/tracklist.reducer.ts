import {
	TrackListActionTypes,
	TrackListsState,
	AddTrackListAction,
	RemoveTrackListAction,
	AddTrackToTrackListAction,
	RemoveTrackFromTrackListAction,
	EditTrackListTrackOrderAction,
	EditTrackListTitleAction,
	EditTrackListDescriptionAction,
	EditTrackListArtworkAction,
	ResetTrackListAction,
} from './tracklist.action.types';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const initialState = () => {
	let initialData = {
		tracklists: []
	};
	async function getDataFromStorage() {
		const data = await AsyncStorage.getItem('tracklists');
		if (data) {
			let parsedData = JSON.parse(data);
			initialData = parsedData.data;
		}
	}
	getDataFromStorage();
	return initialData;
};

export const tracklists = (
	state: TrackListsState = initialState(),
	action: AddTrackListAction | RemoveTrackListAction | AddTrackToTrackListAction | RemoveTrackFromTrackListAction | EditTrackListTrackOrderAction | EditTrackListTitleAction | EditTrackListDescriptionAction | EditTrackListArtworkAction | ResetTrackListAction
) => {
	const newState: TrackListsState = _.cloneDeep(state);
	switch (action.type) {
		case TrackListActionTypes.ADD_TRACKLIST:
			newState.tracklists = newState.tracklists.concat(action.payload);
			return newState;
		case TrackListActionTypes.REMOVE_TRACKLIST:
			newState.tracklists = newState.tracklists.filter(tracklist => tracklist.id !== action.payload.tracklistId);
			return newState;
		case TrackListActionTypes.ADD_TRACK_TO_TRACKLIST:
			newState.tracklists = newState.tracklists.map(tracklist => {
				if (tracklist.id === action.payload.tracklistId) {
					tracklist.tracks = tracklist.tracks.concat(action.payload.tracks);
				}
				return tracklist;
			});
			return newState;
		case TrackListActionTypes.REMOVE_TRACK_FROM_TRACKLIST:
			newState.tracklists.forEach(tracklist => {
				if (tracklist.id === action.payload.tracklistId) {
					tracklist.tracks = tracklist.tracks.filter(track => track.id !== action.payload.trackId);
				}
			});
			return newState;
		case TrackListActionTypes.EDIT_TRACKLIST_TRACK_ORDER:
			newState.tracklists.forEach(tracklist => {
				if (tracklist.id === action.payload.tracklistId) {
					tracklist.tracks = action.payload.tracks;
				}
			});
			return newState;
		case TrackListActionTypes.EDIT_TRACKLIST_TITLE:
			newState.tracklists = newState.tracklists.map(tracklist => {
				if (tracklist.id === action.payload.tracklistId) {
					tracklist.title = action.payload.title;
				}
				return tracklist;
			});
			return newState;
		case TrackListActionTypes.EDIT_TRACKLIST_DESCRIPTION:
			newState.tracklists = newState.tracklists.map(tracklist => {
				if (tracklist.id === action.payload.tracklistId) {
					tracklist.description = action.payload.description;
				}
				return tracklist;
			});
			return newState;
		case TrackListActionTypes.EDIT_TRACKLIST_ARTWORK:
			newState.tracklists = newState.tracklists.map(tracklist => {
				if (tracklist.id === action.payload.tracklistId) {
					tracklist.artwork = action.payload.artwork;
				}
				return tracklist;
			});
			return newState;
		case TrackListActionTypes.RESET_TRACKLIST:
			newState.tracklists = [];
			return newState;
		default:
			return newState;
	}
};
