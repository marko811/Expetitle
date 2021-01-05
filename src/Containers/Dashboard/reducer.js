import {
  SET_PROPERTIES,
  ADD_PROPERTIES,
  RESET_PROPERTIES,
  END_REACHED,
} from './constants';

const INITIAL_STATE = {
  properties: [],
  endReached: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROPERTIES:
      return {...state, properties: action.payload, endReached: false};
    case END_REACHED:
      return {...state, endReached: true};
    case ADD_PROPERTIES:
      return {...state, properties: state.properties.concat(action.payload)};
    case RESET_PROPERTIES:
      return {...state, properties: []};
    default:
      return state;
  }
};
