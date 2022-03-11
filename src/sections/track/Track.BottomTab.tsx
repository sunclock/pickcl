import React, { useState, useRef } from 'react';
import { StyleSheet, Dimensions, TextInput, Platform, StatusBar } from 'react-native';
import { Pressable, Modal, Center, Text, Button, Box, KeyboardAvoidingView } from 'native-base';
import { useProgress } from 'react-native-track-player';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ITrack } from '../../types';
import { Colors } from '../../styles/Colors';
import { useDispatch } from 'react-redux';
import { addPick } from '../../reducers/pick';

interface BottomTabProp {
	track: ITrack,
	isDarkMode: boolean,
}

function BottomTab({ track, isDarkMode }: BottomTabProp) {
	const progress = useProgress();
	const [timestamp, setTimestamp] = useState(0);
	const [modalVisible, setModalVisible] = useState(false);
	const [onPress, setPress] = useState('');
	const [memo, setMemo] = useState('');
	const dispatch = useDispatch();
	const inputRef = useRef<TextInput>(null);
	const iconColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
	const backgroundColor = isDarkMode ? Colors.dark.hover : Colors.background;
	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<Center shadow={2} borderRadius='20' style={styles.container} bgColor={backgroundColor}>
				<Pressable
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
					<Box
						alignItems="center"
						justifyContent="center"
						width={width / 1.3}
					>
						<Ionicons
							name={onPress === 'bookmark' ? "ios-bookmark-sharp" : "ios-bookmark-outline"}
							size={25}
							color={iconColor}
						/>
						<Text>Bookmark</Text>
					</Box>
				</Pressable>
			</Center>
			<Modal isOpen={modalVisible} onClose={setModalVisible} size='xl'>
				<Modal.Content maxH="400"
					bgColor={isDarkMode ? Colors.dark.card : Colors.background}
					color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				>
					<Modal.CloseButton />
					<Modal.Header>
						<Text color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>내 픽 작성하기</Text>
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
		</KeyboardAvoidingView>
	);
}

export default BottomTab;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: height / 30,
		left: 20,
		right: 20,
		borderColor: Colors.darkGray,
		borderRadius: 15,
		padding: 5,
		paddingBottom: 5,
	},
});