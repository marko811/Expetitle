import {
  VERIFYCODE,
  VERIFYCODE_SUCCESS,
  VERIFYCODE_FAILED,
  NEWPASSWORD,
  NEWPASSWORD_SUCCESS,
  NEWPASSWORD_FAILED,
} from './constants';

const INITIAL_STATE = {
  error: '',
  codeerror: '',
  message: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEWPASSWORD:
      return {...state, error: '', loading: true};
    case NEWPASSWORD_SUCCESS:
      return {
        ...state,
        error: action.message,
        message: '',
        loading: false,
      };
    case NEWPASSWORD_FAILED:
      return {...state, loading: false, error: action.message};
    case VERIFYCODE:
      return {...state, codeerror: '', loading: true};
    case VERIFYCODE_SUCCESS:
      return {
        ...state,
        codeerror: '',
        loading: false,
      };
    case VERIFYCODE_FAILED:
      return {...state, loading: false, codeerror: action.message};

    default:
      return state;
  }
};
