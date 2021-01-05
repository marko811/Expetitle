import {SHOW_LOADING, HIDE_LOADING} from './constants';
import {ExpApi} from '../../services';
import {showToast} from '../../services/operators';

export const showLoading = () => {
  return dispatch => {
    dispatch({
      type: SHOW_LOADING,
    });
  };
};

export const hideLoading = () => {
  return dispatch => {
    dispatch({
      type: HIDE_LOADING,
    });
  };
};
