import React, { useRef, useState } from 'react';
import { HStack, Modal, Text, Button, Input, Stack, Icon, InputRightAddon } from 'native-base';
import { TouchableWithoutFeedback, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TrackScreenProp } from '../../navigation/RootNavigator';
import { Colors } from '../../styles/Colors';
import { useDispatch } from 'react-redux';
import { changeSkipInterval } from '../../reducers/track';

interface HeaderProp {
	navigation: TrackScreenProp;
	isDarkMode: boolean;
	defaultSkipInterval: number;
}

function Header({ navigation, isDarkMode, defaultSkipInterval }: HeaderProp) {
	const [modalVisible, setModalVisible] = useState(false);
	const [skipInterval, setSkipInterval] = useState(defaultSkipInterval); // second unit
	const dispatch = useDispatch();
	const inputRef = useRef<TextInput>(null);
	return (
		<>
			<HStack justifyContent='space-between'>
				<TouchableWithoutFeedback>
					<Ionicons
						style={{ marginLeft: 15 }}
						name="ios-chevron-back-sharp"
						size={31}
						color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
						onPress={() => navigation.navigate('TrackList')} />
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback>
					<Ionicons
						style={{ marginRight: 15 }}
						name="ios-settings-outline"
						size={31}
						color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
						onPress={() => {
							setModalVisible(true)
							setTimeout(() => {
								inputRef.current?.blur();
								inputRef.current?.focus();
							}, 100);
						}} />
				</TouchableWithoutFeedback>
			</HStack>
			<Modal isOpen={modalVisible} onClose={setModalVisible} size='xl'>
				<Modal.Content maxH="400"
					bgColor={isDarkMode ? Colors.dark.card : Colors.background}
					color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
				>
					<Modal.CloseButton />
					<Modal.Header>
						<Text color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>환경설정</Text>
					</Modal.Header>
					<Modal.Body>
						<Stack space={4} w="100%" alignItems={'center'} >
							<Input
								keyboardType='numeric'
								color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
								selectionColor={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
								ref={inputRef}
								value={skipInterval.toString()}
								onChangeText={(text) => setSkipInterval(Number(text))}
								textAlign={'center'}
								mt={4}
								w={{
									base: "50%",
									md: "25%"
								}} InputLeftElement={
									<Icon as={<Ionicons name="ios-timer-outline" />} size={5} ml="2"
										color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText} />}
								InputRightElement={
									<InputRightAddon borderWidth={0} bgColor={isDarkMode ? Colors.dark.card : Colors.background}
										children={"초"}
									/>}
								placeholder='스킵 시간' />
						</Stack>
					</Modal.Body>
					<Modal.Footer
						bgColor={isDarkMode ? Colors.dark.card : Colors.background}>
						<Button.Group space={2}>
							<Button variant='ghost' colorScheme='dark' onPress={() => {
								setModalVisible(false);
							}}>
								취소
							</Button>
							<Button
								background={isDarkMode ? Colors.dark.primary : Colors.primary}
								onPress={() => {
									setModalVisible(false);
									dispatch(changeSkipInterval(skipInterval));
								}}>
								저장
							</Button>
						</Button.Group>
					</Modal.Footer>
				</Modal.Content>
			</Modal>
		</>
	);
}

export default Header;