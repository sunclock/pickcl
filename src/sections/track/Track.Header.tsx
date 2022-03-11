import React from 'react';
import { HStack } from 'native-base';
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
			</HStack>
		</>
	);
}

export default Header;