import { StyleSheet, Platform } from 'react-native';
import { Metrics, Adjust, Fonts, Colors } from '../../../utils';
export default StyleSheet.create({
  // WIRE INDEX //
  aboutContainer: {
    backgroundColor: '#f6f8fd',
    display: 'flex',
  },

  rightIconStyle: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    alignSelf: 'center'
  },

  // WIRES INSTRUCTIONS //
  wiresFlatListStyle: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EDECEC'
  },
  wiresTitle: {
    fontFamily: 'Roboto-Light',
    fontSize: 17,
    color: '#2b3d5b',
    flex: 1,
  },
  wiresTitleChevron: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: '#29354b',
  },
  wireSubHeader: {
    width: '100%', height: 50, backgroundColor: '#83b1ff', justifyContent: 'center'
  },
  wireSubHeaderText: {
    fontFamily: 'Roboto-Medium', fontSize: 19, color: '#FFF', textAlign: 'center' 
  },
  wireDetailsTitle:{ fontSize: 17, fontFamily: 'Roboto-Bold', color: '#2b3d5b',paddingTop:15 },
  wireDetailsSubTitle:{ fontSize: 17, fontFamily: 'Roboto-Regular', color: '#2b3d5b', lineHeight: 26, paddingTop: 15, },
  wireDetailsSubTitle1:{ fontSize: 17, fontFamily: 'Roboto-Regular', color: '#2b3d5b', lineHeight: 26, paddingTop: 10, textDecorationLine:'underline' },
});
