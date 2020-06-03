import { DISPLAY_ERROR, CLOSE_ERROR } from '../actions/types';

const INITIAL_STATE = {
  errorMsg: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY_ERROR:
      return { ...state, errorMsg: action.payload.errorMsg };
    case CLOSE_ERROR:
      return { ...state, errorMsg: null };
    default:
      return state;
  }
};
