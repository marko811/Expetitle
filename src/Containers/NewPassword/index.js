import React from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AppInputField from '../../Components/AppInputField/index';
import AppButton from '../../Components/AppButton';
import styles from './styles';
import {connect} from 'react-redux';
import {VerifyCode, NewPass} from './actions';
import {Images, Validation} from '../../utils';
import RNRestart from 'react-native-restart';
class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: '',
      confirmpassword: '',
      newPasswordError: '',
      confirmpasswordError: '',
      matchpasswordError: '',
      token: '',
    };
  }

  componentDidMount() {
    let mytoken = this.props.route.params.token;
    const data = {
      token: mytoken,
    };
    this.setState({
      token: mytoken,
    });
    this.props.VerifyCode(data, this.restart);
  }
  onChangeNewPassword = text => {
    this.setState({
      newPassword: text,
    });
  };

  onChangeConfirmPassword = text => {
    this.setState({
      confirmpassword: text,
    });
  };

  restart = () => {
    setTimeout(() => {
      RNRestart.Restart();
    }, 3000);
  };
  validationCheck = text => {
    let errorType = text;

    switch (errorType) {
      case 'newPassword':
        this.setState({
          newPasswordError: Validation.Password(this.state.newPassword),
        });
        break;
      case 'confirmPassword':
        this.setState({
          confirmpasswordError: Validation.Password(this.state.confirmpassword),
        });
        break;
      default:
        this.setState({
          newPasswordError: Validation.Password(this.state.newPassword),
          confirmpasswordError: Validation.Password(this.state.confirmpassword),
        });
    }
  };

  onSubmit = async () => {
    await this.validationCheck('newPassword');
    await this.validationCheck('confirmPassword');
    const {newPasswordError, confirmpasswordError} = this.state;
    if (newPasswordError === '' && confirmpasswordError === '') {
      if (this.state.newPassword === this.state.confirmpassword) {
        this.setState({matchpasswordError: ''});
        let formData = {
          token: this.state.token,
          password: this.state.newPassword,
        };
        this.props.NewPassword(formData, this.restart);
      } else {
        this.setState({matchpasswordError: 'Passwords do not match'});
      }
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.newPasscontainer}>
        <StatusBar backgroundColor="#0061ff" barStyle="light-content" />
        <View style={styles.newPasscontainer}>
          <View style={styles.newPasslogoContainer}>
            <Image
              style={styles.newPassAppLogo}
              source={Images.expetitlewordmark}
              resizeMode={'contain'}
            />
          </View>
          <AppInputField
            containerStyles={styles.newPassInput}
            fieldLabel={'New Password'}
            inputStyles={styles.newPassInputStyles}
            onChangeText={text => this.onChangeNewPassword(text)}
            errorText={this.state.newPasswordError}
            value={this.state.newPassword}
            secureTextEntry={true}
          />
          <AppInputField
            inputStyles={styles.newPassInputStyles}
            value={this.state.confirmpassword}
            onChangeText={text => this.onChangeConfirmPassword(text)}
            fieldLabel={'Confirm Password'}
            errorText={this.state.confirmpasswordError}
            secureTextEntry={true}
          />

          <AppButton
            onPress={() => {
              this.props.codeerror === '' ? this.onSubmit() : '';
            }}
            buttonMainContainerStyles={
              this.props.error !== ''
                ? styles.sumbitButtonStylesWithError
                : styles.sumbitButtonStyles
            }
            label={'Submit'}
          />
          {this.state.matchpasswordError !== '' && (
            <Text style={styles.errorTextNewPass}>
              {this.state.matchpasswordError}
            </Text>
          )}
          {this.props.error !== '' && (
            <Text style={styles.errorTextNewPass}>{this.props.error}</Text>
          )}
          {this.props.codeerror !== '' && (
            <Text style={styles.errorTextNewPass}>{this.props.codeerror}</Text>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  const {loading, error, codeerror} = state.newPasswordState;
  return {
    loading,
    error,
    codeerror,
  };
};

const mapDispatchToProps = (dispatch: (...any) => void) => ({
  dispatch,
  VerifyCode: (data, restart) => {
    dispatch(VerifyCode(data, restart));
  },
  NewPassword: (data, restart) => {
    dispatch(NewPass(data, restart));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
