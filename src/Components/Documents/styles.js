import { StyleSheet, Platform } from 'react-native';
import { Metrics, Adjust, Fonts, Colors } from '../../utils';
export default StyleSheet.create({
  documentsContainer: {
    width: '100%',
    height: 'auto',
    maxHeight: 367,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    paddingVertical: 15,
  },
  documentsHeading: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  documentsHeadingText: {
    fontSize: 25,
    color: '#343c43',
    fontFamily: 'Poppins-Regular',
    marginLeft: 10
  },
  documentsEmpty: {
    fontSize: 16,
    color: '#343c43',
    fontFamily: 'Poppins-Regular',
  },

  documentsListContainer: {
    width: '100%',
    paddingHorizontal: 25,
    flexGrow: 1,
    height: 'auto',
  },
  documentItem: {
    width: '100%',
    height: 65,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 18,
    marginVertical: 5,
    backgroundColor: '#f3f5f8',
  },
  emptyContainer: {
    width: '100%',
    height: 270,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  headerImage: { width: 25, height: 20, marginLeft: 10 },
  FileIcon: { width: 20, height: 25, marginRight: 25, marginLeft: 24, resizeMode: 'contain' },
  docName: {
    flexShrink: 1,
    height: 20,
    fontSize: 16,
    maxWidth: '90%',
    color: '#9e9e9e',
    fontFamily: 'Roboto-Medium',
  },
  docDate: {
    fontSize: 11,
    color: '#9e9e9e',
    fontFamily: 'Roboto-Medium',
  },
});
