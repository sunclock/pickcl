import React, { useEffect, useState } from 'react';
import { useColorScheme, SafeAreaView, StatusBar, ActivityIndicator, FlatList, TouchableOpacity, View, Image, Dimensions, Linking, Alert } from 'react-native';
import Header from '../components/Header';
import { DramaScreenProp } from '../navigation/AppNavigator';
import { Colors } from '../styles/Colors';
import firestore from '@react-native-firebase/firestore';
import { Box, Center, HStack, Text } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { storeDramas } from '../reducers/drama/drama.actions';

interface DramaProp {
	navigation: DramaScreenProp;
}
function Drama({ navigation }: DramaProp) {
	const [loading, setLoading] = useState(true); // Set loading to true on component mount
	const [dramas, setDramas] = useState([]); // Initial empty array of users
	const test = useSelector((state: any) => state.drama);
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.dark.background : Colors.background,
		flex: 1,
	};
	useEffect(() => {
		const subscriber = firestore()
			.collection('dramas')
			.onSnapshot(querySnapshot => {
				const dramas = [];

				querySnapshot.forEach(documentSnapshot => {
					dramas.push({
						...documentSnapshot.data(),
						key: documentSnapshot.id,
					});
				});

				setDramas(dramas);
				dispatch(storeDramas(dramas));
				setLoading(false);
			});

		// Unsubscribe from events when no longer in use
		return () => subscriber();
	}, []);

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={isDarkMode ? Colors.dark.background : Colors.background} />
			<Header isDarkMode={isDarkMode} title={'드라마'} navigation={navigation} />
			{loading ?
				<ActivityIndicator /> :
				<FlatList
					data={dramas}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={async () => {
								if (item.url) {
									const supported = await Linking.canOpenURL(item.url);
									if (supported) {
										await Linking.openURL(item.url);
									} else {
										Alert.alert(`URL 오류`,
											`올바른 형식의 주소가 아니에요. \nURL: ${item.url}`,
											[{ text: '확인' }]
										);
									}
								} else {
									Alert.alert(`URL 오류`,
										`등록된 주소가 없어요.`,
										[{ text: '확인' }]
									);
								}
							}}
						>
							<HStack m='1' p='2'>
								<Box mx='1' px='2' mt='1' w='100' h='100' borderWidth={0.5} borderColor={Colors.darkGray} borderRadius={'md'} justifyContent='center' alignItems={'center'}>
									<Image
										style={{
											width: 60,
											height: 60,
										}}
										source={{ uri: 'https://i.ibb.co/1fyhtQ1/Group-7-1.png' }}
									/>
								</Box>
								<Box mx='1' px='2' w={Dimensions.get('window').width - 150}>
									<Text fontSize='md' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
										{item.title}
									</Text>
									{item.author !== "" &&
										<Text fontSize='sm' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
											{item.author}
										</Text>
									}
									<Text fontSize='xs' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
										{item.production}
									</Text>
									{item.cast !== "" &&
										<Text fontSize='xs' color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}>
											{item.cast.join(', ')}
										</Text>
									}
								</Box>
							</HStack>
						</TouchableOpacity>
					)}
					keyExtractor={item => item.key}
				/>
			}
		</SafeAreaView>
	);
}

export default Drama;