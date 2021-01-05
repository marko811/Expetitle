import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0061ff',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  logoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  appLogo: {
    width: Adjust(233),
    height: Adjust(36),
  },
  userNameInput: {
    marginVertical: 19,
  },
  inputStylesPassword: {
    color: '#ffa185',
  },
  inputStylesUsername: {
    color: '#ffa185',
  },
  loginButtonStyles: {
    marginVertical: 33,
  },
  loginButtonStylesWithError: {
    marginTop: 25,
    marginBottom: 20,
  },
  forgotTextStyles: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
});
