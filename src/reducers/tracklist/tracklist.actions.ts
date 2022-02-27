import {
	TrackListActionTypes,
	AddTrackListAction,
	RemoveTrackListAction,
	AddTrackToTrackListAction,
	RemoveTrackFromTrackListAction,
	EditTrackListTrackOrderAction,
	EditTrackListTitleAction,
	EditTrackListDescriptionAction,
	EditTrackListArtworkAction,
} from './tracklist.action.types';
import { ITrackList, IImage, ITrack } from '../../types';

export const addTrackList = (tracklist: ITrackList): AddTrackListAction => ({
	type: TrackListActionTypes.ADD_TRACKLIST,
	payload: tracklist
});

export const removeTrackList = (tracklistId: string | number): RemoveTrackListAction => ({
	type: TrackListActionTypes.REMOVE_TRACKLIST,
	payload: {
		tracklistId
	}
});

export const AddTrackToTrackList = (tracklistId: string | number, tracks: ITrack[]): AddTrackToTrackListAction => ({
	type: TrackListActionTypes.ADD_TRACK_TO_TRACKLIST,
	payload: {
		tracklistId,
		tracks
	}
});

export const removeTrackFromTrackList = (tracklistId: string | number, trackId: string | number): RemoveTrackFromTrackListAction => ({
	type: TrackListActionTypes.REMOVE_TRACK_FROM_TRACKLIST,
	payload: {
		tracklistId,
		trackId
	}
});

export const editTrackListTrackOrder = (tracklistId: string | number, tracks: ITrack[]): EditTrackListTrackOrderAction => ({
	type: TrackListActionTypes.EDIT_TRACKLIST_TRACK_ORDER,
	payload: {
		tracklistId,
		tracks
	}
});

export const editTrackListTitle = (tracklistId: string | number, title: string): EditTrackListTitleAction => ({
	type: TrackListActionTypes.EDIT_TRACKLIST_TITLE,
	payload: {
		tracklistId,
		title
	}
});

export const editTrackListDescription = (tracklistId: string | number, description: string): EditTrackListDescriptionAction => ({
	type: TrackListActionTypes.EDIT_TRACKLIST_DESCRIPTION,
	payload: {
		tracklistId,
		description
	}
});

export const editTrackListArtwork = (tracklistId: string | number, artwork: IImage): EditTrackListArtworkAction => ({
	type: TrackListActionTypes.EDIT_TRACKLIST_ARTWORK,
	payload: {
		tracklistId,
		artwork
	}
});