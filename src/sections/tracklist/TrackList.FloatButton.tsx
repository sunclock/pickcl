import React, { useState } from 'react';
import { Box } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TrackListScreenProp } from '../../navigation/RootNavigator';
import { Pressable } from 'react-native';
import { Colors } from '../../styles/Colors';

interface FloatButtonProp {
	navigation: TrackListScreenProp;
}

function FloatButton({ navigation }: FloatButtonProp) {
	const [longPress, setLongPress] = useState(false);
	return (
		<Box alignItems="center"
			justifyContent="center"
			position="absolute" bottom='100' right='5'
			shadow='5'
			width={60} height={60}
			borderRadius={50}
			backgroundColor={Colors.primary}
		>
			{/* I'm Feeling Lucky! */}
			<Pressable
				onPress={() => {
					navigation.navigate('Track');
				}}
				onLongPress={() => setLongPress(true)}
				onTouchEnd={() => setLongPress(false)}
				onTouchCancel={() => setLongPress(false)}
				onPressOut={() => setLongPress(false)}
			>
				<Ionicons
					name={
						longPress
							? "ios-heart-sharp"
							: "ios-headset-sharp"
					}
					size={30}
					color={Colors.white} />
			</Pressable>
		</Box>
	);
}

export default FloatButton;