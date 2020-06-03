import { DISPLAY_LOADING, CLOSE_LOADING } from '../actions/types';

const INITIAL_STATE = {
  show: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DISPLAY_LOADING:
      return { ...state, show: true };
    case CLOSE_LOADING:
      return { ...state, show: false };
    default:
      return state;
  }
};
