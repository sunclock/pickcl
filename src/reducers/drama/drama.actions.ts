import {
	DramaActionTypes,
	StoreDramaAction,
} from './drama.action.types';

export const storeDramas = (dramas): StoreDramaAction => {
	return {
		type: DramaActionTypes.STORE_DRAMA,
		payload: dramas,
	}
}