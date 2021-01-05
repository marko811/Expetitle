import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  mainView: {
    width: 320,
    height: 'auto',
    backgroundColor: '#fddce0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#e43b50',
    marginBottom: 5
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  imgStyle: {
    height: 18,
    width: 18,
    tintColor: 'red',
    resizeMode: 'contain',
    marginLeft: 5
  },
  errorTextLogin: {
    color: '#cf273c',
    fontSize: 16,
    fontFamily: 'Roboto',
    marginLeft: 10,
  },
});
