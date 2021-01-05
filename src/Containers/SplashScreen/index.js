import React from 'react';
import { View, Image, Linking, Platform } from 'react-native';
import { Images, Validation } from '../../utils';
import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from '../../Components/Loader/index';
class Splash extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}
	componentDidMount() {
		Linking.getInitialURL().then((urlstring) => {
			if (urlstring !== null) {
				var token = this.getParameterByName('token', urlstring);
				if (token === null) {
					this.fetchToken(this.props.navigation);
				} else {
					this.CheckLink(token);
				}
			} else {
				this.fetchToken(this.props.navigation);
			}
		});
	}

	async CheckLink(token) {
		await AsyncStorage.getItem('token').then((value) => {
			if (value !== null) {
				if (value === JSON.stringify(token)) {
					this.fetchToken(this.props.navigation);
				} else {
					this.props.navigation.reset({
						routes: [ { name: 'NewPassword', params: { token: token } } ]
					});
					AsyncStorage.setItem('token', JSON.stringify(token));
				}
			} else {
				this.props.navigation.reset({
					routes: [ { name: 'NewPassword', params: { token: token } } ]
				});
				AsyncStorage.setItem('token', JSON.stringify(token));
			}
		});
	}

	getParameterByName(name, url) {
		name = name.replace(/[\[\]]/g, '\\$&');
		var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}

	handleOpenURL = (event) => {
		if (event.url !== null) {
			let token = url.searchParams.get('token');
			if (token === null) {
				this.fetchToken(this.props.navigation);
			} else {
				this.CheckLink(token);
			}
		} else {
			this.fetchToken(this.props.navigation);
		}
	};

	async fetchToken(navigation) {
		await AsyncStorage.getItem('userToken').then((value) => {
			if (value !== null) {
				this.setState({ loading: true });
				navigation.reset({
					routes: [ { name: 'Home' } ]
				});
			} else {
				navigation.reset({
					routes: [ { name: 'Auth' } ]
				});
			}
		});
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					{/* <Loader
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,97,255,1)',
            }}
            hide
            isVisible={this.state.loading}
          /> */}
					<Image style={styles.appLogo} source={Images.expetitleLetterLogo} resizeMode={'contain'} />
				</View>
			</View>
		);
	}
}
export default Splash;
