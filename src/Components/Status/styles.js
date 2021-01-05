import {StyleSheet} from 'react-native';
import {Adjust} from '../../utils';
export default StyleSheet.create({
  statusContainer: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  statusTextContainer: {
    top: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  buttonContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideItemContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  stagesHeading: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  scrollImagesContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    display: 'flex',
    height: 100,
  },
  expandIconView: {
    width: '100%',
    alignItems: 'center',
  },
  expandText: {
    color: '#adadad',
    fontSize: 16,
    flexWrap: 'wrap',
    fontFamily: 'Roboto-Regular',
    width: Adjust(335),
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  statusHeadingText: {
    fontSize: 25,
    color: '#343c43',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10,
  },
  HeaderImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
