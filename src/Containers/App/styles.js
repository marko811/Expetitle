import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tabStyle: {
    height: Platform.OS === 'ios' ? 80 : 60,
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    backgroundColor: '#FFF',
    position: 'absolute',
    borderTopColor: '#BBBBBB',
  },
  imageStyle: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  loadingView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
