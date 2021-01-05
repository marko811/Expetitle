import { StyleSheet, Platform } from 'react-native';
import { Metrics, Adjust, Fonts, Colors } from '../../utils';
export default StyleSheet.create({
	// PROFILE INDEX //
	aboutContainer: {
		backgroundColor: '#f6f8fd',
		display: 'flex'
	},
	titleLabel: {
		fontFamily: 'Roboto-Bold',
		fontSize: 17,
		color: '#2b3d5b',
		flex: 0.4
	},
	subtitleLabel: {
		fontFamily: 'Roboto-Light',
		fontSize: 17,
		color: '#808080',
		flex: 0.8
	},
	logoutText: {
		fontSize: 18,
		fontFamily: 'Roboto-Light',
		color: '#2b3d5b',
		textDecorationLine: 'underline',
		textAlign: 'center',
		marginTop: 60
	},
	profileHeaderTitle: {
		fontSize: 25,
		fontFamily: 'Roboto-Medium',
		color: 'white',
		alignSelf: 'center',
		left: 25
	},
	rightIconStyle: {
		fontSize: 25,
		fontFamily: 'Roboto-Medium',
		color: 'white',
		alignSelf: 'center'
	},
	flatListStyle: {
		flexDirection: 'row',
		padding: 20,
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderBottomColor: '#EDECEC'
	},
	chevronStyle: {
		height: 20,
		width: 20,
		resizeMode: 'contain',
		tintColor: '#29354b'
	},

	// FULLNAME //
	textInput: {
		fontSize: 16,
		fontFamily: 'Roboto-Light',
		borderWidth: 0.2,
		borderRadius: 8,
		backgroundColor: '#FFF',
		borderColor: '#aaa',
		marginBottom: 15,
		paddingLeft: 15,
		height: 50,
		marginBottom: 20
	},
	textInputMessage: {
		fontSize: 16,
		fontFamily: 'Roboto-Light',
		borderWidth: 0.2,
		borderRadius: 8,
		backgroundColor: '#FFF',
		borderColor: '#aaa',
		marginBottom: 15,
		paddingLeft: 15,
		height: 160,
		marginBottom: 20,
		textAlignVertical: 'top',
		paddingTop: 15
	},
	fullNameLables: {
		fontFamily: 'Roboto-Bold',
		fontSize: 17,
		color: '#2b3d5b',
		bottom: 5,
		left: 2
	},
	fullNameButton: {
		backgroundColor: '#4b8eff',
		height: 50,
		width: '100%',
		borderRadius: 50,
		justifyContent: 'center',
		top: 20
	},
	fullNameButtonText: {
		fontFamily: 'Roboto-Medium',
		fontSize: 20,
		color: '#FFF',
		textAlign: 'center'
	},
	warningView: {
		flexDirection: 'row',
		bottom: 15
	},
	warnImage: {
		height: 20,
		width: 20,
		alignSelf: 'center',
		resizeMode: 'contain'
	},
	warnText: {
		color: 'grey',
		fontFamily: 'Roboto-Regular',
		fontSize: 16,
		letterSpacing: 0.5
	},

	// WIRES INSTRUCTIONS //
	wiresFlatListStyle: {
		flexDirection: 'row',
		padding: 20,
		backgroundColor: '#FFF',
		borderBottomWidth: 1,
		borderBottomColor: '#EDECEC'
	},
	wiresTitle: {
		fontFamily: 'Roboto-Light',
		fontSize: 17,
		color: '#2b3d5b',
		flex: 1
	},
	wiresTitleChevron: {
		height: 20,
		width: 20,
		resizeMode: 'contain',
		tintColor: '#29354b'
	},

	// MODAL //
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(203,204,207,0.5)'
	},
	modalView: {
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		height: Platform.OS === 'ios' ? Adjust(170) : Adjust(180),
		width: Adjust(280)
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
		fontFamily: 'Roboto-Medium',
		fontSize: 17
	},

	// CONTACT US //
	contactUsModalImage: { height: 60, width: 60, resizeMode: 'contain', top: 20 },
	contactUsModalText: {
		fontSize: 17,
		fontFamily: 'Roboto-Medium',
		color: '#2b3d5b',
		position: 'absolute',
		bottom: 40
	},
	contactUsScrollView: { flexGrow: 1, marginLeft: 20, marginRight: 20, top: 40 },
	contactUsAddress: {
		textAlign: 'center',
		fontSize: 17,
		fontFamily: 'Roboto-Light',
		lineHeight: 32,
		color: '#2b3d5b'
	}
});
