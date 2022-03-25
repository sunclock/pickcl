export interface IImage {
	uri: string;
	filename: string;
	width?: number;
	height?: number;
}

export interface IVoiceActor {
	id: string;
	name: string;
	role?: string;
	image?: IImage;
	description?: string;
}

export interface ITrack {
	id: string | number;
	filename: string;
	title?: string;
	season?: number | string;
	episode?: number | string;
	duration?: number;
	artwork?: IImage;
	artist?: string;
	url: string;
	voiceActors?: IVoiceActor[];
}

export interface ITrackList {
	id: string | number;
	tracks: ITrack[];
	title: string;
	description?: string;
	artwork?: IImage;
	voiceActors?: IVoiceActor[];
}

export interface IPick {
	id: string | number;
	track: ITrack;
	timestamp: number;
	memo?: string;
	voiceActors?: IVoiceActor[];
}

interface IUser {
	uid: string;
	email?: string;
	avatar?: string;
	tracks?: ITrack[];
	picks?: IPick[];
	displayName?: string;
	emailVerified: boolean;
	isAnonymous: boolean;
	metadata: {
		creationTime: number;
		lastSignInTime: number;
	};
	phoneNumber?: string;
	photoURL?: string;
	providerData: [];
	providerId: string;
	tenantId?: string;
}

export interface IProgress {
	track?: ITrack;
	user?: IUser;
	timestamp?: number;
}