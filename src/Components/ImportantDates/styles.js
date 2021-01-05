import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  impDatesContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginVertical: Adjust(20),
    paddingVertical: 15,
  },
  impDatesHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  impDatesHeadingText: {
    fontSize: 25,
    color: '#343c43',
    fontFamily: 'Poppins-Regular',
    marginLeft:8
  },
  datesContainer: {
    width: '100%',
    paddingHorizontal: 25,
    height: 'auto',
  },
  dateRow: {
    flexDirection: 'row',
    display: 'flex',
    marginVertical: 8,
  },
  headerImage: {
    width: 20,
    height: 20,
    marginLeft:10,
    resizeMode:'contain'
  },
});
