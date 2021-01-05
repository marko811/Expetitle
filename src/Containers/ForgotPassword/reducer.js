import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_STATE,
} from './constants';

const INITIAL_STATE = {
  error: '',
  loading: false,
  user: '',
  Step1: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_STATE:
      return {...state, error: '', loading: false, Step1: true};
    case FORGOT_PASSWORD:
      return {...state, error: '', loading: true, Step1: true};
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        error: '',
        loading: false,
        Step1: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {...state, loading: false, Step1: true, error: action.payload};
    default:
      return state;
  }
};
