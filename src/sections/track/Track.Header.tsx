import React from 'react';
import { Box } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TrackScreenProp } from '../../navigation/RootNavigator';

interface HeaderProp {
	navigation: TrackScreenProp;
}

function Header({ navigation }: HeaderProp) {
	return (
		<Box justifyContent="center" pl={4} pt={2}>
			<TouchableWithoutFeedback onPress={() => navigation.navigate('TrackList')}>
				<Ionicons
					name="ios-chevron-back-sharp"
					size={31}
					color="black"
					onPress={() => navigation.navigate('TrackList')} />
			</TouchableWithoutFeedback>
		</Box>
	);
}

export default Header;