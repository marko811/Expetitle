import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  feildContainer: {
    width: '100%',
    paddingHorizontal: 44,
  },
  fieldLabel: {
    color: 'white',
    fontFamily: 'Roboto-Medium',
    marginBottom: 8,
    fontSize: 18,
  },
  errorLabel: {
    color: '#ff1a1a',
    fontFamily: 'Roboto-Medium',
    marginTop: 7,
    fontSize: 15,
    textAlign: 'center',
  },
  input: {
    width: 320,
    fontSize: 16,
    height: 48,
    paddingHorizontal: 13,
    fontFamily: 'BryantPro-Medium',
    backgroundColor: '#ffffff',
    borderRadius: 5,
  },
});
