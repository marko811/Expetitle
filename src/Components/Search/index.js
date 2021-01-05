import React from 'react';
import { View, TextInput, Image } from 'react-native';
import styles from './styles';
import { Images } from '../../utils';

export default (Search = (props) => {
	return (
		<View style={styles.container}>
			<View style={styles.SectionStyle}>
				<Image source={Images.search} style={styles.icon} />
				<TextInput
					ref={props.ref}
					allowFontScaling={false}
					onSubmitEditing={props.onSubmitEditing}
					editable={true}
					selectTextOnFocus={true}
					onChangeText={props.onChangeText}
					placeholderTextColor={'#808080'}
					value={props.value}
					style={styles.input}
					placeholder="Search Property"
				/>
			</View>
		</View>
	);
});
