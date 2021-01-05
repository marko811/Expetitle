import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Image, Text} from 'react-native';
import {connect} from 'react-redux';
import NavigationService from '../../services/NavigationService';
import Login from '../Login/index';
import Dashboard from '../Dashboard/index';
import Splash from '../SplashScreen/index';
import ForgotPassword from '../ForgotPassword/index';
import NewPassword from '../NewPassword/index';
import Profile from '../Profile/index';
import FullName from '../Profile/fullName';
import Password from '../Profile/password';
import WireInstructions from '../Profile/wireInstructions/index';
import BeycomeTitle from '../Profile/wireInstructions/beycomeTitle';
import ExpetitleClosingServices from '../Profile/wireInstructions/expetitleClosingServices';
import ContactUs from '../Profile/contactUs';
import TransactionDetail from '../TransactionDetail/index';
import ShareUpdate from '../ShareUpdate/index';
import Sent from '../ShareUpdate/sent';
import DocumentView from '../../Components/DocumentView/index';
import Calculator from '../Calculator/index';
import EstimateHistory from '../Calculator/estimateHistory';
import ViewEstimationHistory from '../Calculator/viewEstimationHistory';
import ShareEstimation from '../Calculator/shareEstimation';
import ShareEstimationProceeds from '../Calculator/shareEstimationProceeds';
import EstimatedClosingCosts from '../Calculator/estimatedClosingCosts';
import EstimatedSellerProceed from '../Calculator/estimatedSellerProceeds';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Images} from '../../utils';
import Loader from '../../Components/Loader';
import styles from './styles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      lazy={true}
      initialRouteName="Dashboard"
      tabBarOptions={{
        showLabel: false,
        style: styles.tabStyle,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, tintColor}) => {
          let imagepath;
          if (route.name === 'Dashboard') {
            imagepath = focused ? Images.homeBlue : Images.homeGrey;
          } else if (route.name === 'Calculator') {
            imagepath = focused ? Images.calcBlue : Images.calcGrey;
          } else if (route.name === 'Profile') {
            imagepath = focused ? Images.settingsBlue : Images.settingsGrey;
          }
          return (
            <Image
              style={styles.imageStyle}
              tintColor={tintColor}
              focused={focused}
              source={imagepath}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Calculator"
        component={CalculatorContainers}
        unmountOnBlur={true}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={ProfileContainers} />
    </Tab.Navigator>
  );
}

export function CalculatorContainers() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Calculator"
        component={Calculator}
        unmountOnBlur={true}
        options={{unmountOnBlur: true}}
      />
      <Stack.Screen
        name="EstimatedClosingCosts"
        component={EstimatedClosingCosts}
      />
      <Stack.Screen
        name="ViewEstimationHistory"
        component={ViewEstimationHistory}
      />
      <Stack.Screen name="ShareEstimation" component={ShareEstimation} />
      <Stack.Screen
        name="ShareEstimationProceeds"
        component={ShareEstimationProceeds}
      />
      <Stack.Screen name="EstimateHistory" component={EstimateHistory} />
    </Stack.Navigator>
  );
}

export function ProfileContainers() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="FullName" component={FullName} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="WireInstructions" component={WireInstructions} />
      <Stack.Screen name="BeycomeTitle" component={BeycomeTitle} />
      <Stack.Screen
        name="ExpetitleClosingServices"
        component={ExpetitleClosingServices}
      />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
}

function AppContainer({loading}) {
  const deepLinking = {
    prefixes: [
      'https://app.expetitle.com',
      'expetitle://',
      'https://dev.expetitle.com',
    ],
    config: {
      screens: {
        Home: 'Dashboard',
        TransactionDetail: {
          path: 'transaction/:itemId',
        },
      },
    },
  };

  return (
    <NavigationContainer
      linking={deepLinking}
      ref={ref => NavigationService.setNavigator(ref)}
      fallback={<Text>Loading...</Text>}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen
          name="Auth"
          component={AuthStack}
          options={{gestureEnabled: false}}
        />
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="TransactionDetail" component={TransactionDetail} />
        <Stack.Screen
          name="EstimatedClosingCosts"
          component={EstimatedClosingCosts}
        />
        <Stack.Screen
          name="EstimatedSellerProceed"
          component={EstimatedSellerProceed}
        />
        <Stack.Screen name="DocumentView" component={DocumentView} />
        <Stack.Screen name="ShareUpdate" component={ShareUpdate} />
        <Stack.Screen name="Sent" component={Sent} />
      </Stack.Navigator>
      <Loader isVisible={loading} />
    </NavigationContainer>
  );
}

const mapStateToProps = state => {
  const {loading} = state.appState;
  return {
    loading,
  };
};

export default connect(
  mapStateToProps,
  undefined,
)(AppContainer);
