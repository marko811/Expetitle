import { StyleSheet, Platform } from 'react-native';
import { Metrics, Adjust, Fonts, Colors } from '../../utils';
export default StyleSheet.create({
  forgotContainer: {
    flex: 1,
    backgroundColor: '#0061ff',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 80
  },
  linkSentContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotLogoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Adjust(30),
  },
  tickContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Adjust(17),
    marginBottom: Adjust(25),
  },
  forgotAppLogo: {
    width: Adjust(233),
    height: Adjust(36),
  },
  forgotTick: {
    width: Adjust(233),
    height: Adjust(36),
  },
  forgotNote: {
    color: '#ffffff',
    width: Adjust(290),
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
    textAlign: 'center',
    display: 'flex',
    fontFamily: 'Roboto-Medium',
  },
  forgotNoteContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: Adjust(17),
  },
  forgotSuccessContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  inputStylesForgot: {
    color: '#ffa185',
  },
  forgotButtonStyles: {
    marginVertical: Adjust(36),
  },
  errorText: {
    color: '#ff1a1a',
    fontFamily: 'Roboto-Medium',
  },
  step1Form: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});
