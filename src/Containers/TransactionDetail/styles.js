import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  transactionDetailContainer: {
    backgroundColor: '#f6f8fd',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexGrow: 1,
    paddingHorizontal: Adjust(20),
    paddingTop: Adjust(20),
    paddingBottom: Adjust(120),
  },
  propertyDetailsView: {
    width: '100%',
    backgroundColor: '#83b1ff',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  propertyDetailsText: {
    textAlign: 'center',
    width: '90%',
    fontSize: 19,
    fontFamily: 'Roboto-Medium',
    color: '#FFF',
    alignSelf: 'center',
  },
  rightIconStyle: {
    fontSize: 21,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    width: '50%',
    marginLeft: 40,
  },
});
