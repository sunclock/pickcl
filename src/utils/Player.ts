import TrackPlayer, { Capability, Event, RepeatMode, State, Track, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { useSelector } from 'react-redux';
import { ITrack, ITrackList } from '../types';

export function convertTrackType(tracks: ITrack | ITrack[]) {
	let res: Track[] | Track = [];
	if (tracks instanceof Array) {
		let now = new Date();
		res = tracks.map((track: ITrack) => {
			return {
				id: track.id + '' + now.toISOString(),
				url: track.id,
				title: track.filename,
				artwork: track.artwork?.uri,
				artist: JSON.stringify(track.voiceActors),
			};
		});
	} else {
		res = {
			id: tracks.id,
			url: tracks.id,
			title: tracks.filename,
		};
	}
	return res;
}

export async function togglePlay(playbackState: State) {
	const currentTrack = await TrackPlayer.getCurrentTrack();
	if (currentTrack === null || currentTrack === undefined)
		await setupIfNeeded();
	else {
		if (playbackState !== State.Playing)
			await TrackPlayer.play();
		else
			await TrackPlayer.pause();
	}
	// Set up the player
	await TrackPlayer.setupPlayer();

	// Start playing it
	await TrackPlayer.play();
};

export async function setupIfNeeded() {
	// if app was relaunched and music was already playing, we don't setup again.
	const currentTrack = await TrackPlayer.getCurrentTrack();
	if (currentTrack !== null) {
		return;
	}
	await TrackPlayer.setupPlayer({});
	await TrackPlayer.updateOptions({
		stopWithApp: false,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.Stop,
			// Capability.SeekTo,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.SetRating,
		],
		compactCapabilities: [Capability.Play, Capability.Pause],
	});
	TrackPlayer.setRepeatMode(RepeatMode.Off);
	TrackPlayer.stop();
}