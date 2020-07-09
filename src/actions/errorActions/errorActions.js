import * as types from '../../constants/actionTypes';

export const showError = errorMsg => {
  return {
    type: types.ERROR_SHOW,
    error: errorMsg,
  };
};

export const hideError = () => {
  return {
    type: types.ERROR_HIDE,
  };
};
