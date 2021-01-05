import {StyleSheet, Platform} from 'react-native';
import {Metrics, Adjust, Fonts, Colors} from '../../utils';
export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    ...Platform.select({
      ios: {
        paddingTop:
          Metrics.screenHeight === 812 ||
          Metrics.screenWidth === 812 ||
          Metrics.screenHeight === 896 ||
          Metrics.screenWidth === 896
            ? 45
            : 25,
        height:
          Metrics.screenHeight === 812 ||
          Metrics.screenWidth === 812 ||
          Metrics.screenHeight === 896 ||
          Metrics.screenWidth === 896
            ? Metrics.tabBarHieghtIphoneX
            : Metrics.tabBarHeight,
      },
      android: {
        height: Metrics.tabBarHeightAndroid,
        paddingTop: 15,
      },
    }),
    backgroundColor: '#025ef8',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    paddingHorizontal: 17,
    elevation: 2,
    zIndex: 101,
  },
  leftIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  rightIcon: {
    width: 54,
    height: 54,
  },
  rightIconContainer: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  leftIconContainer: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  headerTitle: {
    fontSize: 24,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    fontWeight: '600',
  },
  labelStylesDash: {
    fontSize: 25,
    fontFamily: 'Roboto-Medium',
    color: 'white',
    marginLeft: 35,
  },
});
