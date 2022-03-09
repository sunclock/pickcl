import React from 'react';
import { Box } from 'native-base';
import { TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TrackScreenProp } from '../../navigation/RootNavigator';
import { Colors } from '../../styles/Colors';

interface HeaderProp {
	navigation: TrackScreenProp;
	isDarkMode: boolean;
}

function Header({ navigation, isDarkMode }: HeaderProp) {
	return (
		<Box justifyContent="center" pl={4} pt={2}>
			<TouchableWithoutFeedback onPress={() => navigation.navigate('TrackList')}>
				<Ionicons
					name="ios-chevron-back-sharp"
					size={31}
					color={isDarkMode ? Colors.dark.primaryText : Colors.primaryText}
					onPress={() => navigation.navigate('TrackList')} />
			</TouchableWithoutFeedback>
		</Box>
	);
}

export default Header;