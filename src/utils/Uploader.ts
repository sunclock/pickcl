import DocumentPicker from 'react-native-document-picker'
import { Alert, Platform } from 'react-native';
import { getAllExternalFilesDirs } from 'react-native-fs';
import { ITrack } from '../types';

export async function getPrimaryStorageRootPath() {
	let root = await getAllExternalFilesDirs();
	let storage;
	if (Platform.OS == 'android') {
		storage = root.find(storage => storage.includes('Android'));
		storage = storage?.split('Android')[0];
	} else {
		Alert('iOS not supported');
	}
	return storage;
}

export async function pickFiles(tracks: ITrack[]) {
	try {
		const root = await getPrimaryStorageRootPath();
		const files = await DocumentPicker.pickMultiple({
			type: [DocumentPicker.types.audio],
		})
		const newTracks: ITrack[] = [];
		files.map(async (file) => {
			if (!isDuplicate(tracks, file)) {
				let path = decodeURI(file.uri.split('%3A')[1]).replace(/%2F/gi, "/");
				let track = {
					id: file.uri,
					filename: file.name.split('.').slice(0, -1).join('.'),
					url: `file://${root}${path}`,
					artist: '',
					title: '',
				}
				newTracks.push(track);
			}
		})
		return newTracks;
	} catch (err) {
		if (DocumentPicker.isCancel(err)) {
			// User cancelled the picker, exit any dialogs or menus and move on
		} else {
			throw err
		}
	}
}

export function isDuplicate(tracks: ITrack[], file: { uri: String }) {
	let duplicate = false;
	tracks.map((track: ITrack) => {
		if (track.id === file.uri) {
			duplicate = true;
		}
	});
	return duplicate;
}