export enum DramaActionTypes {
	STORE_DRAMA = 'STORE_DRAMA',
	DRAMA_LOADING = 'DRAMA_LOADING',
}

export type StoreDramaAction = {
	type: DramaActionTypes.STORE_DRAMA;
	payload: any;
};

export type DramaLoadingAction = {
	type: DramaActionTypes.DRAMA_LOADING;
};

export type DramaState = {
	dramas: any;
	isLoading: boolean;
	isFirstOpen: boolean;
	error: any;
};

export type AppState = {
	drama: DramaState;
};