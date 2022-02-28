import TrackPlayer, { Capability, Event, RepeatMode, State, Track, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { SampleTrack, SamplePicks, SampleTrackList } from '../templates/sample';

export const setupIfNeeded = async () => {
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
	await TrackPlayer.add(SampleTrackList.tracks);
	TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export const togglePlayback = async (playbackState: State) => {
	const currentTrack = await TrackPlayer.getCurrentTrack();
	if (currentTrack == null) {
		// TODO: Perhaps present an error or restart the playlist?
		setupIfNeeded();

	} else {
		if (playbackState !== State.Playing) {
			await TrackPlayer.play();
		} else {
			await TrackPlayer.pause();
		}
	}
};
