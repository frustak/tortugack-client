import { OPEN_MODAL, CLOSE_MODAL } from '../actions/types';

const INITIAL_STATE = {
  isOpen: false,
  content: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: true, content: action.payload };
    case CLOSE_MODAL:
      return { ...state, isOpen: false, content: null };
    default:
      return state;
  }
};
