import DocumentPicker from 'react-native-document-picker'

export async function pickFiles() {
	try {
		const res = await DocumentPicker.pick({
			type: [DocumentPicker.types.allFiles],
		})

		res.map(file => {
			console.log('type', file.type);
			console.log('name', file.name);
			console.log('uri', file.uri);
		})

	} catch (err) {
		if (DocumentPicker.isCancel(err)) {
			// User cancelled the picker, exit any dialogs or menus and move on
		} else {
			throw err
		}
	}
}

export function readDocuments() {
	var RNFS = require('react-native-fs');
	RNFS.getAllExternalFilesDirs()
		.then((result: any) => {
			console.log('resolved result', result);
		})

	RNFS.getFSInfo()
		.then((result: any) => {
			console.log('resolved result', result);
		})

	RNFS.readDir("/storage/emulated/0/") // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
		.then((result: { path: any; }[]) => {
			console.log('GOT RESULT', result);

			// stat the first file
			return Promise.all([RNFS.stat(result[0].path), result[0].path]);
		})
		// .then((statResult) => {
		//   if (statResult[0].isFile()) {
		//     // if we have a file, read it
		//     return RNFS.readFile(statResult[1], 'utf8');
		//   }

		//   return 'no file';
		// })
		.then((contents: any) => {
			// log the file contents
			console.log('contents', contents);
		})
		.catch((err: { message: any; code: any; }) => {
			console.log(err.message, err.code);
		});
}