import React from 'react';
import { View, Text, KeyboardAvoidingView, Image } from 'react-native';
import styles from './styles';
import { Images, Validation } from '../../utils';
import AppInputField from '../../Components/AppInputField/index';
import AppButton from '../../Components/AppButton';
import AppHeader from '../../Components/AppHeader';
import { connect } from 'react-redux';
import { forgotPassword, resetState } from './actions';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
    };
  }

  componentDidMount() {
    this.props.resetState();
  }
  onChangeEmail = text => {
    this.setState({
      email: text,
    });
  };

  validationCheck = text => {
    let errorType = text;

    switch (errorType) {
      case 'username':
        this.setState({
          emailError: Validation.Email(this.state.email),
        });
        break;

      default:
        this.setState({
          emailError: Validation.Email(this.state.email),
        });
    }
  };

  onSubmit = async () => {
    await this.validationCheck('email');
    const { emailError } = this.state;
    if (emailError === '') {
      const formData = {
        email: this.state.email,
      };
      this.props.sendRequest(formData);
    }
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.forgotContainer}>
        <AppHeader showLeftIcon={true} onPressLeft={() => this.props.navigation.goBack()} />
        <View style={styles.forgotContainer}>
          <View style={styles.forgotLogoContainer}>
            <Image
              style={styles.forgotAppLogo}
              source={Images.expetitlewordmark}
              resizeMode={'contain'}
            />
          </View>
          {this.props.Step1 && (
            <View style={styles.step1Form}>
              <View style={styles.forgotNoteContainer}>
                <Text style={styles.forgotNote}>
                  To reset your password, enter the email address you use to
                  login to Expetitle
                </Text>
              </View>
              <AppInputField
                inputStyles={styles.inputStylesForgot}
                onChangeText={text => this.onChangeEmail(text)}
                fieldLabel={''}
                errorText={this.state.emailError}
              />
              <AppButton
                onPress={() => this.onSubmit()}
                buttonMainContainerStyles={styles.forgotButtonStyles}
                label={'Submit'}
              />
              <Text style={styles.errorText}>{this.props.error}</Text>
            </View>
          )}
          {!this.props.Step1 && (
            <View style={styles.linkSentContainer}>
              <View style={styles.tickContainer}>
                <Image
                  style={styles.forgotTick}
                  source={Images.tick}
                  resizeMode={'contain'}
                />
              </View>
              <View style={styles.forgotSuccessContainer}>
                <Text style={styles.forgotNote}>
                  Please check your email. You will receive an email momentarily
                  if you are in our records.{' '}
                </Text>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = state => {
  const { loading, error, Step1 } = state.forgotState;
  return {
    loading,
    error,
    Step1,
  };
};

const mapDispatchToProps = (dispatch: (...any) => void) => ({
  dispatch,
  sendRequest: data => {
    dispatch(forgotPassword(data));
  },
  resetState: () => {
    dispatch(resetState());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
