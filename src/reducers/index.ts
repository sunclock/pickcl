import { combineReducers } from 'redux';
import { tracks } from './track';
import { picks } from './pick';
import { tracklists } from './tracklist';

export const rootReducer = combineReducers({
	tracks,
	picks,
	tracklists
});