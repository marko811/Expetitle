import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Colors} from '../../utils';
export default StyleSheet.create({
  // CALCULATOR SCREEN //
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD',
    display: 'flex',
  },
  scrollViewContent: {
    flexGrow: 1,
    width: '90%',
    alignSelf: 'center',
  },
  safeView: {
    backgroundColor: '#f5f8fd',
    flex: 1,
    display: 'flex',
  },
  topView: {
    backgroundColor: '#025ef8',
    height: Adjust(270),
  },
  shareButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: Platform.OS === 'android' ? Adjust(20) : Adjust(50),
    position: 'absolute',
    width: '100%',
  },
  breakDownRect: {
    height: Adjust(15),
    width: Adjust(15),
    borderRadius: 5,
    marginTop: Adjust(5),
  },
  title: {
    textAlign: 'center',
    fontSize: Adjust(27),
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    lineHeight: 33,
  },
  estimatedCost: {
    textAlign: 'center',
    fontSize: Adjust(34),
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
    marginTop: Adjust(10),
  },
  checkboxIcon: {
    height: 25,
    width: 25,
    marginLeft: 10,
  },
  bottomView: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#f5f8fd',
    bottom: Adjust(30),
    padding: Adjust(30),
  },
  estimationBreak: {
    fontSize: Adjust(18),
    color: '#2b3d5b',
    fontFamily: 'Poppins-Regular',
  },
  flatlistView: {
    flexDirection: 'row',
    width: '100%',
    top: Adjust(10),
  },
  flatlistSubview: {
    flexDirection: 'row',
    paddingVertical: Adjust(8),
  },
  itemTitle: {
    left: Adjust(20),
    fontSize: 17,
    color: Colors.lightDark,
    fontFamily: 'Poppins-Medium',
    marginRight: Adjust(30),
    lineHeight: Adjust(25),
    fontWeight: '800',
    opacity: 0.75,
  },
  itemPrice: {
    left: Adjust(20),
    fontSize: 17,
    color: Colors.lightDark,
    fontFamily: 'Poppins-Regular',
    marginRight: Adjust(30),
    lineHeight: Adjust(25),
    opacity: 0.75,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    borderWidth: 0.2,
    borderRadius: 8,
    backgroundColor: '#FFF',
    borderColor: '#aaa',
    marginBottom: 15,
    paddingLeft: 15,
    height: 50,
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: '#818C9F',
    paddingVertical: 8,
  },
  buttonStyle: {
    backgroundColor: '#4b8eff',
    width: '100%',
    height: 52,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    top: 10,
  },
  buttonTitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
  },
  rightIconStyle: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    textAlign: 'center',
    width: '100%',
  },
  reCalculate: {
    backgroundColor: '#4b8eff',
    width: '100%',
    height: Adjust(50),
    borderRadius: Adjust(50),
    alignSelf: 'center',
    justifyContent: 'center',
    top: Adjust(25),
    marginBottom: Adjust(40),
  },
  dropDownContainer: {
    height: 50,
    marginBottom: 20,
  },
  dropDownPlaceholder: {
    color: '#CECECE',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  dropDownLabel: {
    color: '#868686',
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  dropDownStyle: {
    backgroundColor: '#FFF',
    borderWidth: 0.2,
    borderRadius: 8,
    borderColor: '#aaa',
  },
  warningIcon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  warningText: {color: 'grey', fontFamily: 'Poppins-Regular'},

  // ESTIMATED CLOSING COST //
  shareIcon: {
    tintColor: '#FFF',
    height: 30,
    width: 30,
    marginRight: 20,
    resizeMode: 'contain',
  },
  backIcon: {
    tintColor: '#FFF',
    height: 22,
    width: 22,
    marginLeft: 20,
    resizeMode: 'contain',
  },
  shareIconTouch: {
    alignSelf: 'flex-end',
    right: Adjust(20),
    top: Adjust(50),
    position: 'absolute',
  },
  backIconTouch: {
    alignSelf: 'flex-start',
    right: Adjust(20),
    top: Adjust(50),
    position: 'absolute',
  },
  typeOfEstimate: {
    textAlign: 'center',
    fontSize: Adjust(16),
    color: '#A1A1A1',
    marginTop: Adjust(20),
    marginBottom: Adjust(10),
    fontFamily: 'Poppins-Regular',
  },
  savingNoteText: {
    fontSize: 18,
    color: '#2b3d5b',
    fontFamily: 'Poppins-Regular',
  },
  savingPercentNoteText: {
    fontSize: Adjust(18),
    color: '#2b3d5b',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  notetext: {color: '#2b3d5b', top: Adjust(10), fontFamily: 'Roboto-Light'},

  // ESTIMATION HISTORY SCREEN //
  containerEstiamtion: {
    flex: 1,
    backgroundColor: '#F6F7F9',
    display: 'flex',
    alignItems: 'center',
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    marginBottom: 8,
    marginTop: 8,
    elevation: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    display: 'flex',
    borderRadius: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#F6F8FD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#F6F8FD',
    right: 0,
  },
  rowView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rowAddressText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    color: '#2b3d5b',
    flexWrap: 'wrap',
    flex: 1,
  },

  // SHARE ESTIMATION //
  headerAddress: {
    ...Platform.select({
      ios: {
        paddingTop:
          Metrics.screenHeight === 812 ||
          Metrics.screenWidth === 812 ||
          Metrics.screenHeight === 896 ||
          Metrics.screenWidth === 896
            ? 45
            : 25,
      },
      android: {
        paddingTop: 15,
      },
    }),
    backgroundColor: '#025ef8',
    display: 'flex',
  },
  addressTextView: {
    backgroundColor: '#83B1FF',
    width: '100%',
    paddingVertical: 15,
  },
  addressText: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 19,
    color: '#FFF',
    fontFamily: 'Roboto-Medium',
  },
  shareEstimatedClosingCostView: {
    backgroundColor: '#025ef8',
    height: Adjust(180),
  },
  shareEstimatedClosingCost: {
    textAlign: 'center',
    fontSize: Adjust(24),
    color: '#FFF',
    fontFamily: 'Roboto-Regular',
    lineHeight: 33,
    letterSpacing: -0.67,
    marginTop: Platform.OS === 'android' ? 30 : 30,
  },
  shareEstimatedDataText: {
    textAlign: 'center',
    letterSpacing: -0.86,
    fontSize: Adjust(31),
    marginTop: 10,
    color: '#FFF',
    fontFamily: 'Poppins-SemiBold',
  },
  shareBottomNote: {
    top: Adjust(20),
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    textAlign: 'center',
    color: '#9f9f9f',
    lineHeight: 25,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: Colors.lightDark,
    lineHeight: 25,
    marginLeft: Adjust(6),
    opacity: 0.58,
  },
  infoIcon: {
    width: Adjust(15),
    height: Adjust(15),
    marginLeft: Adjust(6),
    marginBottom: Adjust(12),
  },
});
