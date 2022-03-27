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
	const dispatch = useDispatch();
	const isDarkMode = useColorScheme() === 'dark';
	let boxSize = width / 3.5;
	let borderColor = isDarkMode ? Colors.darkGray : Colors.gray;
	let fontColor = isDarkMode ? Colors.dark.primaryText : Colors.primaryText;
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
							style={{ margin: 10, padding: 3 }}
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
							<HStack ml='1'>
								{item.photo_url
									? <Image style={{ width: boxSize, height: boxSize, borderRadius: 5, alignItems: 'center' }} source={{ uri: item.photo_url }} />
									: <Box style={{ width: boxSize, height: boxSize, backgroundColor: borderColor, borderWidth: 1, borderColor: borderColor, borderRadius: 5 }} />
								}
								<Box w={Dimensions.get('window').width - boxSize - 30} mx='2' px='2'>
									<Text fontSize='md' color={fontColor}>
										{item.title}
									</Text>
									{item.author !== "" &&
										<Text fontSize='sm' color={fontColor}>
											{item.author}
										</Text>
									}
									<Text fontSize='xs' color={fontColor}>
										{item.production}
									</Text>
									{item.cast !== "" &&
										<Text fontSize='xs' color={fontColor}>
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

const { width, height } = Dimensions.get('window');