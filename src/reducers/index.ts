import { combineReducers } from 'redux';
import { tracks } from './track';
import { picks } from './pick';
import { tracklists } from './tracklist';
import { auth } from './auth';
import { dramas } from './drama';

export const rootReducer = combineReducers({
	tracks,
	picks,
	tracklists,
	auth,
	dramas,
});