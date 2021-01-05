import {
  SET_PROPERTIES,
  ADD_PROPERTIES,
  RESET_PROPERTIES,
  END_REACHED,
} from './constants';
import {SHOW_LOADING, HIDE_LOADING} from '../App/constants.js';
import {ExpApi} from '../../services';
import {showToast} from '../../services/operators';

export const fetchProperties = (page, query, token) => {
  // query is the search text
  return dispatch => {
    dispatch({
      type: SHOW_LOADING,
    });
    if (query.length > 0) {
      ExpApi.SearchQuery(query, token)
        .then(response => {
          if (response.status === 200) {
            dispatch({
              type: SET_PROPERTIES,
              payload: response.data.data.transactions,
            });
          } else {
            showToast(response.data.message);
          }
          dispatch({
            type: HIDE_LOADING,
          });
        })
        .catch(error => {
          dispatch({
            type: HIDE_LOADING,
          });
          showToast(error);
        });
    } else {
      ExpApi.FetchProperties(page, token)
        .then(response => {
          if (response.status === 200) {
            if (page === 1) {
              dispatch({
                type: SET_PROPERTIES,
                payload: response.data.data.transactions,
              });
            } else if (response.data.data.transactions.length === 0) {
              dispatch({
                type: END_REACHED,
              });
            } else {
              dispatch({
                type: ADD_PROPERTIES,
                payload: response.data.data.transactions,
              });
            }
          } else {
            showToast(response.data.message);
          }
          dispatch({
            type: HIDE_LOADING,
          });
        })
        .catch(error => {
          dispatch({
            type: HIDE_LOADING,
          });
          showToast(error);
        });
    }
  };
};

export const resetProperties = () => {
  return dispatch => {
    dispatch({type: RESET_PROPERTIES});
  };
};
