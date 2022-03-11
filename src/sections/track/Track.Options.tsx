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
	const iconColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	const textColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
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
								size={25}
								color={iconColor} />
							: <MaterialIcons name="repeat-one" size={25} color={iconColor} />
						}
					</Pressable>
				</Center>
				<Center style={styles.buttonContainer}>
					<Pressable
						style={styles.button}
						onPress={onOpen}>
						<Text style={{ fontSize: 18, color: textColor }}>{skipInterval}s</Text>
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
							size={25}
							color={iconColor}
						/>
					</Pressable>
				</Center>
			</HStack>
			<Center>
				<Actionsheet isOpen={isOpen} onClose={onClose} >
					<Actionsheet.Content>
						<Box w="100%" h={60} px={4} justifyContent="center">
							<Text style={{ fontSize: 16, color: Colors.darkGray }}>
								트랙 이동 시간 설정
							</Text>
						</Box>
						<Actionsheet.Item onPress={() => {
							dispatch(changeSkipInterval(10))
							onClose()
						}}>10초</Actionsheet.Item>
						<Actionsheet.Item onPress={() => {
							dispatch(changeSkipInterval(15))
							onClose()
						}}>15초</Actionsheet.Item>
						<Actionsheet.Item
							onPress={() => {
								dispatch(changeSkipInterval(30))
								onClose()
							}}>30초</Actionsheet.Item>
						<Actionsheet.Item onPress={() => {
							dispatch(changeSkipInterval(60))
							onClose()
						}}>60초</Actionsheet.Item>
						<Actionsheet.Item onPress={() => onClose()}>닫기</Actionsheet.Item>
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
						<Text style={{ color: textColor }}>내 픽 작성하기</Text>
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
								취소
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
								등록
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