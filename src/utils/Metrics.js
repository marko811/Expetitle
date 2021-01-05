import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  normalMargin: 15,
  headingWidth: 380,
  doubleBaseMargin: 20,
  smallMargin: 5,
  horizontalLineHeight: 1,
  searchBarHeight: 40,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  containerTopMargin: {
    ...Platform.select({
      ios: {
        marginTop:
          height === 812 || width === 812 || height === 896 || width === 896
            ? 80
            : 56,
      },
      android: {
        marginTop: 56,
      },
    }),
  },
  navBarHeight: Platform.OS === 'ios' ? 64 : 54,
  mediumMargin: 12,
  tabBarHeight: 80,
  innerContainerWidth: width - 50,
  tabBarHieghtIphoneX: 100,
  tabBarHeightAndroid: 75,
  textInputHeight: Platform.OS === 'ios' ? 30 : 40,
  buttonRadius: 4,
  cardWidth: 350,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60,
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 180,
  },
};

export default metrics;
