import React, { useState, useRef } from 'react';
import { StyleSheet, Dimensions, TextInput, Text, Pressable, Alert } from 'react-native';
import { Modal, Center, Button, Actionsheet, useDisclose, Box, HStack } from 'native-base';
import TrackPlayer, { RepeatMode, useProgress } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ITrack } from '../../types';
import { Colors } from '../../styles/Colors';
import { useDispatch } from 'react-redux';
import { addPick } from '../../reducers/pick';
import { changeSkipInterval } from '../../reducers/track';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface OptionsProp {
	track: ITrack,
	isDarkMode: boolean,
	skipInterval: number,
}

function Options({ track, isDarkMode, skipInterval }: OptionsProp) {
	const progress = useProgress();
	const [timestamp, setTimestamp] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [onPress, setPress] = useState('');
	const [memo, setMemo] = useState('');
	const [repeatMode, setRepeatMode] = useState(RepeatMode.Queue);
	const dispatch = useDispatch();
	const inputRef = useRef<TextInput>(null);
	const iconColor = isDarkMode ? Colors.dark.primary : Colors.primary;
	const textColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	const backgroundColor = isDarkMode ? Colors.dark.hover : Colors.background;
	const { isOpen, onOpen, onClose } = useDisclose();

	async function changeMode() {
		const mode = await TrackPlayer.getRepeatMode();
		if (mode === RepeatMode.Queue) {
			TrackPlayer.setRepeatMode(RepeatMode.Track);
			setRepeatMode(RepeatMode.Track);
		} else {
			TrackPlayer.setRepeatMode(RepeatMode.Queue);
			setRepeatMode(RepeatMode.Queue);
		}
	};
	return (
		<>
			<HStack style={styles.container}>
				<Center style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						onPress={() => changeMode()}>
						{repeatMode === RepeatMode.Queue
							? <Ionicons
								name="ios-repeat-outline"
								size={30}
								color={iconColor} />
							: <MaterialIcons name="repeat-one" size={30} color={iconColor} />
						}
					</Pressable>
				</Center>
				<Center style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						onPress={onOpen}>
						<Text style={{ fontSize: 18, color: iconColor }}>{skipInterval}???</Text>
					</Pressable>
				</Center>
				<Center style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						onPressIn={async () => setPress('bookmark')}
						onPressOut={async () => setPress('')}
						onPress={async () => {
							setTimestamp(progress.position);
							setModalVisible(!modalVisible);
							setTimeout(() => {
								inputRef.current?.blur();
								inputRef.current?.focus();
							}, 100);
						}}>
						<Ionicons
							name={onPress === 'bookmark' ? "ios-bookmark-sharp" : "ios-bookmark-outline"}
							size={30}
							color={iconColor}
						/>
					</Pressable>
				</Center>
			</HStack>
			<Center>
				<Actionsheet isOpen={isOpen} onClose={onClose}>
					<Actionsheet.Content bgColor={backgroundColor}>
						<Box w="100%" h={60} px={4} justifyContent="center">
							<Text style={{ fontWeight: 'bold', fontSize: 16, color: textColor }}>?????? ?????? ?????? ??????</Text>
						</Box>
						<Actionsheet.Item
							onPress={() => {
								dispatch(changeSkipInterval(5))
								onClose()
							}}>
							<Text style={{ fontSize: 16, color: skipInterval === 5 ? iconColor : textColor }}>5???</Text>
						</Actionsheet.Item>
						<Actionsheet.Item
							onPress={() => {
								dispatch(changeSkipInterval(10))
								onClose()
							}}>
							<Text style={{ fontSize: 16, color: skipInterval === 10 ? iconColor : textColor }}>10???</Text>
						</Actionsheet.Item>
						<Actionsheet.Item
							onPress={() => {
								dispatch(changeSkipInterval(15))
								onClose()
							}}>
							<Text style={{ fontSize: 16, color: skipInterval === 15 ? iconColor : textColor }}>15???</Text>
						</Actionsheet.Item>
						<Actionsheet.Item
							onPress={() => {
								dispatch(changeSkipInterval(30))
								onClose()
							}}>
							<Text style={{ fontSize: 16, color: skipInterval === 30 ? iconColor : textColor }}>30???</Text>
						</Actionsheet.Item>
						<Actionsheet.Item
							onPress={() => {
								dispatch(changeSkipInterval(60))
								onClose()
							}}>
							<Text style={{ fontSize: 16, color: skipInterval === 60 ? iconColor : textColor }}>60???</Text>
						</Actionsheet.Item>
						<Actionsheet.Item
							onPress={() => onClose()}>
							<Text style={{ fontWeight: 'bold', fontSize: 16, color: textColor }}>??????</Text>
						</Actionsheet.Item>
					</Actionsheet.Content>
				</Actionsheet>
			</Center>
			<Modal isOpen={modalVisible} onClose={setModalVisible} size='xl'>
				<Modal.Content maxH="400"
					bgColor={isDarkMode ? Colors.dark.card : Colors.background}
					color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				>
					<Modal.CloseButton />
					<Modal.Header>
						<Text style={{ color: textColor }}>??? ??? ????????????</Text>
					</Modal.Header>
					<Modal.Body>
						<TextInput
							multiline={true}
							ref={inputRef}
							style={{ textAlignVertical: 'top' }}
							autoFocus={true}
							numberOfLines={10}
							value={memo}
							onChangeText={(text) => setMemo(text)}
						/>
					</Modal.Body>
					<Modal.Footer
						bgColor={isDarkMode ? Colors.dark.card : Colors.background}>
						<Button.Group space={2}>
							<Button variant='ghost' colorScheme='dark' onPress={() => {
								setModalVisible(false);
								setMemo('');
							}}>
								??????
							</Button>
							<Button
								background={isDarkMode ? Colors.dark.primary : Colors.primary}
								onPress={() => {
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
								??????
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	);
}

export default Options;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		justifyContent: 'space-between',
	},
	buttonContainer: {
		width: width / 4,
	},
	button: {
		alignItems: 'center',
		marginVertical: 10,
		justifyContent: 'center',
	}
});