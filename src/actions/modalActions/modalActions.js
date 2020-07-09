import * as types from '../../constants/actionTypes';

export const showModal = (modalType, data) => {
  return {
    type: types.MODAL_SHOW,
    modalType,
    data,
  };
};

export const hideModal = () => {
  return {
    type: types.MODAL_HIDE,
  };
};
