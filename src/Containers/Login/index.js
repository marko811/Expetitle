import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar, Platform, BackHandler
} from 'react-native';
import AppInputField from '../../Components/AppInputField/index';
import AppButton from '../../Components/AppButton';
import ErrorBox from '../../Components/ErrorBox';
import styles from './styles';
import { connect } from 'react-redux';
import { UserLogin } from './actions';
import { Images, Validation } from '../../utils';
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      userNameError: '',
      passError: '',
    };
  }

  backAction = () => {
    BackHandler.exitApp()
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  onChangeUserName = async text => {
    this.setState({
      userName: text,
    });
  };
  onChangePassword = async text => {
    this.setState({
      password: text,
    });
  };

  validationCheck = text => {
    let errorType = text;

    switch (errorType) {
      case 'username':
        this.setState({
          userNameError: Validation.Email(this.state.userName),
        });
        break;
      case 'password':
        this.setState({
          passError: Validation.Password(this.state.password),
        });
        break;
      default:
        this.setState({
          userNameError: Validation.Email(this.state.userName),
          passError: Validation.Password(this.state.password),
        });
    }
  };

  onSubmit = async () => {
    await this.validationCheck('password');
    await this.validationCheck('username');
    const { userNameError, passError } = this.state;
    if (userNameError === '' && passError === '') {
      let formData = {
        email: this.state.userName,
        password: this.state.password,
      };
      this.props.authorizeLogin(formData, this.props.navigation);
    }
  };

  forgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword', {});
  };

  render() {
    return (
      <KeyboardAvoidingView behavior={
        Platform.OS == "ios" ? "padding" : "height"
      }
        style={
          styles.container
        }>
        <StatusBar backgroundColor="#0061ff" barStyle="light-content" />
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.appLogo}
              source={Images.expetitlewordmark}
              resizeMode={'contain'}
            />
          </View>
          
          {this.props.error !== '' &&
            <ErrorBox text={this.props.error} imageSource={Images.error2} />
          }
          {this.state.userNameError !== '' &&
            this.props.errorText !== '' &&
            <ErrorBox text={this.state.userNameError} imageSource={Images.error2} />
          }
          {this.state.passError !== '' ?
            this.props.errorText !== '' &&
            <ErrorBox text={this.state.passError} imageSource={Images.error2} />
            : null}

          <AppInputField
            containerStyles={styles.userNameInput}
            fieldLabel={'Email'}
            inputStyles={styles.inputStylesUsername}
            onChangeText={text => this.onChangeUserName(text)}
            value={this.state.userName}
          />
          <AppInputField
            inputStyles={styles.inputStylesPassword}
            onChangeText={text => this.onChangePassword(text)}
            fieldLabel={'Password'}
            secureTextEntry={true}
          />
          <AppButton
            onPress={() => this.onSubmit()}
            buttonMainContainerStyles={
              this.props.error !== ''
                ? styles.loginButtonStylesWithError
                : styles.loginButtonStyles
            }
            label={'Login'}
          />
          <TouchableOpacity onPress={() => this.forgotPassword()}>
            <Text style={styles.forgotTextStyles}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  const { loading, error, user } = state.loginState;
  return {
    loading,
    error,
    user,
  };
};

const mapDispatchToProps = (dispatch: (...any) => void) => ({
  dispatch,
  authorizeLogin: (data, navigation) => {
    dispatch(UserLogin(data, navigation));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
