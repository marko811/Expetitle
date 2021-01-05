import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		backgroundColor: '#f6f8fd',
	},
	SectionStyle: {
		width: '85%',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF',
		borderColor: '#dfdfdf',
		borderWidth: 2,
		borderRadius: 50,
		margin: 10,
		height:45,
	},
	input: {
		flex: 1,
		fontSize: 17,
		fontFamily: 'Avenir',
	},
	icon: {
		padding: 14,
		margin: 8,
		height: 25,
		width: 25,
		resizeMode: 'stretch',
		alignItems: 'center',
	}
});
