import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILED} from './constants';
import {ExpApi} from '../../services';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import navigateToBase from '../../utils/NavigationToBase';
export const UserLogin = (data, navigation) => {
  return dispatch => {
    dispatch({type: LOGIN});
    console.log(ExpApi);
    ExpApi.Login(data, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({type: LOGIN_SUCCESS, user: response.data.user});

          let token = response.data.data.token;
          AsyncStorage.setItem('userToken', JSON.stringify(token)).then(() => {
            navigation.reset({
              routes: [{name: 'Home'}],
            });
          });
        } else {
          dispatch({type: LOGIN_FAILED, message: response.data.message});
        }
      })
      .catch(error => {
        dispatch({type: LOGIN_FAILED, message: error});
        console.log(error);
      });
  };
};
