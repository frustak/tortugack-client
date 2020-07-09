import { LOADING_SHOW, LOADING_HIDE } from '../../constants/actionTypes';

const INITIAL_STATE = {
  show: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_SHOW:
      return { ...state, show: true };
    case LOADING_HIDE:
      return { ...state, show: false };
    default:
      return state;
  }
};
