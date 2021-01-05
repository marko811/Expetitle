import {
  CommonActions,
  NavigationActions,
  StackActions,
} from '@react-navigation/native';

const navigateToBase = (navigation, routeName) => {
  const nav = navigation.reset({
    routes: [{name: routeName}],
  });

  navigation.dispatch(nav);
};

export default navigateToBase;
