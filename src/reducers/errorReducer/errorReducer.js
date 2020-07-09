import { ERROR_SHOW, ERROR_HIDE } from '../../constants/actionTypes';

const INITIAL_STATE = {
  errorMsg: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_SHOW:
      return { ...state, errorMsg: action.error };
    case ERROR_HIDE:
      return { ...state, errorMsg: null };
    default:
      return state;
  }
};
