import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  ImpDateItemContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginVertical: 8,
  },
  dateNameStyle: {
    color: '#9e9e9e',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  dateNameStyleHighlight: {
    color: '#0061ff',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
  },
  nameContainer: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  dateStyle: {
    color: '#9e9e9e',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  dateStyleHighlights: {
    color: '#0061ff',
    fontSize: 16,
    fontFamily: 'Roboto',
  },

  imgDateImg: {
    // marginRight: 16,
    height:20,width:20,resizeMode:'contain'
  },
  iconContainer: {
    width: 30,
  },
});
