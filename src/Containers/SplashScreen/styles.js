import { StyleSheet, Platform } from 'react-native';
import { Metrics, Adjust, Fonts, Colors } from '../../utils';
export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0061ff',
		justifyContent: 'center',
		alignItems: 'center',
		display: 'flex'
	},
	logoContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30
	},
	appLogo: {
		width: Adjust(250),
		height: Adjust(50)
	}
});
