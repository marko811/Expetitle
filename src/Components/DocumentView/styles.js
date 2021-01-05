import { StyleSheet, Platform } from 'react-native';
import { Metrics, Adjust, Fonts, Colors } from '../../utils';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  cross: {
    width: 30,
    height: 30,
  },
  share: {
    width: 38,
    height: 38,
  },
  crosscontainer: {
    ...Platform.select({
      ios: {
        marginTop:
          Metrics.screenHeight === 812 ||
            Metrics.screenWidth === 812 ||
            Metrics.screenHeight === 896 ||
            Metrics.screenWidth === 896
            ? 45
            : 35,
        height:
          Metrics.screenHeight === 812 ||
            Metrics.screenWidth === 812 ||
            Metrics.screenHeight === 896 ||
            Metrics.screenWidth === 896
            ? 50
            : 40,
      },
      android: {
        height: 30,
        marginTop: 35,
        bottom: 15
      },
    }),
  },
});
