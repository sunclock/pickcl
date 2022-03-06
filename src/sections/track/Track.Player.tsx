import React, { useState } from 'react';
import { ITrack } from '../../types';
import { Dimensions, Pressable, TextInput } from 'react-native';
import { Text, HStack, Slider, Box, Button, Modal } from 'native-base';
import TrackPlayer, { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player';
import { togglePlay } from '../../utils/Player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { addPick } from '../../reducers/pick';
import { changeTrack } from '../../reducers/track';

interface PlayerProp {
	track: ITrack;
	tracks: ITrack[];
}

function Player({ track, tracks }: PlayerProp) {
	const [onPress, setPress] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [memo, setMemo] = useState('');
	const [timestamp, setTimestamp] = useState(0);
	const playbackState = usePlaybackState();
	const progress = useProgress();
	const dispatch = useDispatch();
	useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
			dispatch(changeTrack(tracks[event.nextTrack]));
		}
	})

	return (
		<Box mx='3' my='5'>
			<Box w="100%">
				<Slider w="100%"
					value={progress.position}
					defaultValue={0} minValue={0} maxValue={progress.duration}
					accessibilityLabel="hello world" step={0.0001}
					colorScheme='violet'
					onChangeEnd={async (v) => await TrackPlayer.seekTo(v)}>
					<Slider.Track>
						<Slider.FilledTrack />
					</Slider.Track>
					<Slider.Thumb />
				</Slider>
			</Box>
			<HStack justifyContent={'space-between'}>
				<Box>
					<Text textAlign="center">
						{new Date(progress.position * 1000).toISOString().substr(14, 5)}</Text>
				</Box>
				<Box>
					<Text textAlign="center">
						{new Date((progress.duration - progress.position) * 1000)
							.toISOString()
							.substr(14, 5)}</Text>
				</Box>
			</HStack>
			<HStack m='4' space='2' alignSelf={'center'}>
				<Box
					alignItems="center"
					justifyContent="center"
					width={60} height={60}
				>
					<Pressable
						onPressIn={async () => setPress('heart')}
						onPressOut={async () => setPress('')}
						onPress={async () => console.log('liked!')}>
						<Ionicons
							name={onPress === 'heart' ? "ios-heart-sharp" : "ios-heart-outline"}
							size={40}
							color='black'
						/>
					</Pressable>
				</Box>
				<Box
					alignItems="center"
					justifyContent="center"
					width={60} height={60}
				>
					<Pressable
						onPressIn={async () => setPress('backward')}
						onPressOut={async () => setPress('')}
						onPress={async () => {
							await TrackPlayer.skipToPrevious().then(() => {
								TrackPlayer.getCurrentTrack().then((track) => {
									dispatch(changeTrack(tracks[track % tracks.length]));
								});
							})
						}}>
						<Ionicons
							name={onPress === 'backward' ? "ios-play-skip-back-sharp" : "ios-play-skip-back-outline"}
							size={40}
							color='black'
						/>
					</Pressable>
				</Box>
				{playbackState === State.Playing
					? <Box
						alignItems="center"
						justifyContent="center"
						width={60} height={60}
					>
						<Pressable onPress={async () => await TrackPlayer.pause()}>
							<Ionicons
								name="ios-pause-outline"
								size={45}
								color='black'
							/>
						</Pressable>
					</Box>
					: <Box
						alignItems="center"
						justifyContent="center"
						width={60} height={60}
					>
						<Pressable
							onPressIn={async () => setPress('play')}
							onPressOut={async () => setPress('')}
							onPress={async () => await togglePlay(playbackState)} >
							<Ionicons
								name={onPress === 'play' ? "ios-play-sharp" : "ios-play-outline"}
								size={45}
								color='black'
							/>
						</Pressable>
					</Box>
				}
				<Box
					alignItems="center"
					justifyContent="center"
					width={60} height={60}
				>
					<Pressable
						onPressIn={async () => setPress('forward')}
						onPressOut={async () => setPress('')}
						onPress={async () => {
							await TrackPlayer.skipToNext().then(() => {
								TrackPlayer.getCurrentTrack().then((track) => {
									dispatch(changeTrack(tracks[track % tracks.length]));
								});
							})
						}}>
						<Ionicons
							name={onPress === 'forward' ? "ios-play-skip-forward-sharp" : "ios-play-skip-forward-outline"}
							size={40}
							color='black'
						/>
					</Pressable>
				</Box>
				<Box
					alignItems="center"
					justifyContent="center"
					width={60} height={60}
				>
					<Pressable
						onPressIn={async () => setPress('bookmark')}
						onPressOut={async () => setPress('')}
						onPress={async () => {
							setTimestamp(progress.position);
							setModalVisible(!modalVisible)
						}
						}
					>
						<Ionicons
							name={onPress === 'bookmark' ? "ios-bookmark-sharp" : "ios-bookmark-outline"}
							size={40}
							color='black'
						/>
					</Pressable>
				</Box>
			</HStack ><>
				<Modal isOpen={modalVisible} onClose={setModalVisible} size='xl'>
					<Modal.Content maxH="400">
						<Modal.CloseButton />
						<Modal.Header>내 픽 작성하기</Modal.Header>
						<Modal.Body bgColor='trueGray.100'>
							<TextInput
								multiline={true}
								style={{ textAlignVertical: 'top' }}
								numberOfLines={10}
								value={memo}
								onChangeText={(text) => setMemo(text)}
							/>
						</Modal.Body>
						<Modal.Footer>
							<Button.Group space={2}>
								<Button variant='ghost' colorScheme='dark' onPress={() => {
									setModalVisible(false);
									setMemo('');
								}}>
									취소
								</Button>
								<Button background='#7575FF' onPress={() => {
									let now = new Date();
									let id = track.filename + '_' + now.toISOString();
									let pick = {
										id,
										track: track,
										timestamp,
										memo,
										voiceActors: track.voiceActors
									};
									dispatch(addPick(pick));
									setMemo('');
									setModalVisible(false);
								}}>
									등록
								</Button>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
			</>
		</Box >
	);
}

export default Player;

const { width } = Dimensions.get('window');