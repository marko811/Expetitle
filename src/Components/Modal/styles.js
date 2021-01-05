import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Colors} from '../../utils';
export default StyleSheet.create({
  modalContainer: {
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 16,
    color: Colors.lightDark,
    marginVertical: 10,
  },
  content: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.label,
    marginBottom: 10,
  },
  closeText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.blue,
    marginBottom: 10,
  },
});
