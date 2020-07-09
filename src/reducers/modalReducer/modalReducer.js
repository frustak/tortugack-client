import { MODAL_SHOW, MODAL_HIDE } from '../../constants/actionTypes';

const INITIAL_STATE = {
  isOpen: false,
  type: null,
  data: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODAL_SHOW:
      return { ...state, isOpen: true, type: action.modalType, data: action.data };
    case MODAL_HIDE:
      return { ...state, isOpen: false, type: null, data: null };
    default:
      return state;
  }
};
