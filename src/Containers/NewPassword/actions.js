import {
  VERIFYCODE,
  VERIFYCODE_SUCCESS,
  VERIFYCODE_FAILED,
  NEWPASSWORD,
  NEWPASSWORD_SUCCESS,
  NEWPASSWORD_FAILED,
} from './constants';
import {ExpApi} from '../../services';

export const VerifyCode = (body, restart) => {
  return dispatch => {
    dispatch({type: VERIFYCODE});
    ExpApi.VerifyCode(body, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: VERIFYCODE_SUCCESS,
          });
        } else {
          dispatch({
            type: VERIFYCODE_FAILED,
            message: response.data.message,
          });
          restart();
        }
      })
      .catch(error => {
        dispatch({type: VERIFYCODE_FAILED, message: error});
        console.log(error);
      });
  };
};

export const NewPass = (body, restart) => {
  return dispatch => {
    dispatch({type: NEWPASSWORD});
    ExpApi.NewPassword(body, {})
      .then(response => {
        if (response.status === 200) {
          dispatch({
            type: NEWPASSWORD_SUCCESS,
            message: response.data.message,
          });
          restart();
        } else {
          dispatch({
            type: NEWPASSWORD_FAILED,
            message: response.data.message,
          });
        }
      })
      .catch(error => {
        dispatch({type: NEWPASSWORD_FAILED, message: error});
        console.log(error);
      });
  };
};
