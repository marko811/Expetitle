import {SHOW_LOADING, HIDE_LOADING} from './constants';

const INITIAL_STATE = {
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {...state, loading: true};
    case HIDE_LOADING:
      return {...state, loading: false};
    default:
      return state;
  }
};
