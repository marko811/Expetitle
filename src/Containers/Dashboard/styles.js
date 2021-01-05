import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  dashRoot: {
    backgroundColor: '#f6f8fd',
    flexGrow: 1,
  },
  dashContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingBottom: 350,
  },
  rightIconStyle: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    marginLeft: 35,
  },
  emptyText: {
    color: '#808080',
  },
  imageContainer: {width: '30%'},
  propertyImage: {
    width: 90,
    height: 82,
    borderRadius: 10,
  },
  detailContainer: {width: '70%', paddingLeft: 25},
  addressStyle: {
    color: '#025ef8',
    fontSize: 20,
    marginBottom: 5,
    flexShrink: 1,
    height: 30,
    fontFamily: 'Poppins-Regular',
  },
  closingDateContainer: {
    flexDirection: 'row',
    display: 'flex',
    marginBottom: 5,
    width: '100%',
  },
  closingDateLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '800',
  },
  closingDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  startDateContainer: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    marginBottom: 5,
  },
  startDateLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    fontWeight: '800',
  },
  startDate: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  DotsContainer: {
    flexDirection: 'row',
    display: 'flex',
    width: '100%',
    marginTop: 5,
  },
  greenDot: {
    width: 8,
    height: 8,
    backgroundColor: '#59e995',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#59e995',
    marginRight: 3,
  },
  greyDot: {
    width: 8,
    height: 8,
    backgroundColor: '#d8d8d8',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#d8d8d8',
    marginRight: 3,
  },
  yellowDot: {
    width: 8,
    height: 8,
    backgroundColor: '#ffe27e',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffe27e',
    marginRight: 3,
  },
});
