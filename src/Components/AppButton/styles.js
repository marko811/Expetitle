import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  buttonMainContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  buttonContainer: {
    width: 236,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 50,
    backgroundColor: '#ffa185',
  },
  buttonLabel: {
    fontSize: 26,
    color: 'white',
    fontFamily: 'BryantPro-Bold',
  },
});
