import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_STATE,
} from './constants';
import {ExpApi} from '../../services';
import {Alert} from 'react-native';
export const forgotPassword = data => {
  return dispatch => {
    dispatch({type: FORGOT_PASSWORD});
    ExpApi.ResetPassword(data, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: response.data});
          // navigateToBase(navigation, 'Home');
        } else {
          dispatch({
            type: FORGOT_PASSWORD_FAILED,
            payload: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: FORGOT_PASSWORD_FAILED, payload: error});
        console.log(error);
      });
  };
};

export const resetState = () => {
  return dispatch => {
    dispatch({type: RESET_STATE});
  };
};
