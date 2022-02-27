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

export interface IVoiceActorList {
	[key: string]: IVoiceActor;
}

export interface ITrack {
	id: string | number;
	filename: string;
	title?: string;
	season?: number | string;
	episode?: number | string;
	duration: number;
	artwork?: IImage;
	artist?: string;
	uri: string;
	voiceActors?: IVoiceActorList;
}

export interface ITrackList {
	id: string | number;
	tracks: ITrack[];
	title: string;
	description?: string;
	artwork?: IImage;
	voiceActors?: IVoiceActorList;
}

export interface IPick {
	id: string | number;
	track: ITrack;
	timestamp: number;
	memo?: string;
	voiceActors?: IVoiceActorList;
}

interface IUser {
	id: number;
	name: string;
	email: string;
	avatar?: string;
	tracks?: ITrack[];
	picks?: IPick[];
}

export interface IProgress {
	track?: ITrack;
	user?: IUser;
	timestamp?: number;
}