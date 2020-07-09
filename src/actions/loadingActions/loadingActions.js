import * as types from '../../constants/actionTypes';

export const showLoading = () => {
  return { type: types.LOADING_SHOW };
};

export const hideLoading = () => {
  return { type: types.LOADING_HIDE };
};
