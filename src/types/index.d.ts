type IFile = {
	ctime: Date;     // The creation date of the file (iOS only)
	mtime: Date;     // The last modified date of the file
	name: string;     // The name of the item
	path: string;     // The absolute path to the item
	size: string;     // Size in bytes
	isFile: () => boolean;        // Is the file just a file?
	isDirectory: () => boolean;   // Is the file a directory?
};

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