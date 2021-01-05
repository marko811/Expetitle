import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  newPasscontainer: {
    flex: 1,
    backgroundColor: '#0061ff',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  newPasslogoContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  newPassAppLogo: {
    width: Adjust(233),
    height: Adjust(36),
  },
  newPassInput: {
    marginVertical: 19,
  },
  newPassInputStyles: {
    color: '#ffa185',
    fontSize: 23,
  },
  sumbitButtonStyles: {
    marginVertical: 33,
  },
  sumbitButtonStylesWithError: {
    marginTop: 25,
    marginBottom: 20,
  },
  errorTextNewPass: {
    color: '#ff1a1a',
    marginBottom: 20,
    fontSize: 16,
  },
});
