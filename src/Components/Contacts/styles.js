import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  contactsContainer: {
    width: '100%',
    height: 'auto',
    maxHeight: 400,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    marginTop: Adjust(20),
    marginBottom: Adjust(10),
    paddingVertical: 16,
    marginBottom:60
  },
  contactsHeading: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  contactsHeadingText: {
    fontSize: 25,
    color: '#343c43',
    fontFamily: 'Poppins-Regular',
    marginLeft:10
  },
  headerImage: {width: 25, height: 25, marginLeft:10},
  contactsListContainer: {
    width: '100%',
    paddingHorizontal: 25,
    flexGrow: 1,
    height: 'auto',
  },
  contactsItem: {
    width: '100%',
    height: 78,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 0,
    marginVertical: 17,
  },
  contactDetailContainer: {
    height: 78,
    alignItems: 'flex-start',
    marginLeft: 21,
  },
  contactIcon:{
    height:65,width:65
  },
  contactName: {
    fontSize: 19,
    fontFamily: 'Roboto-Medium',
  },
  contactRole: {
    fontSize: 16,
    color: '#9e9e9e',
    fontFamily: 'Roboto-Regular',
  },
  contactPhone: {
    fontSize: 16,
    color: '#025ef8',
    textDecorationLine: 'underline',
    fontFamily: 'Roboto-Regular',
  },
  highlightEmail: {
    fontSize: 16,
    color: '#025ef8',
    textDecorationLine: 'underline',
    fontFamily: 'Roboto-Regular',
    width: 300,
  },

  contactEmail: {
    fontSize: 16,
    width: 300,
    height: 40,
    color: '#9e9e9e',
    fontFamily: 'Roboto-Regular',
  },
});
