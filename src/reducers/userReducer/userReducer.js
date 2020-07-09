import {
  USER_LOGIN,
  USER_CHECK_STATE,
  USER_VERIFY,
  USER_LOGOUT,
} from '../../constants/actionTypes';

const INITIAL_STATE = {
  username: null,
  isVerified: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, username: action.username, isVerified: true };
    case USER_VERIFY:
      return { ...state, username: action.username, isVerified: true };
    case USER_CHECK_STATE:
      return { ...state };
    case USER_LOGOUT:
      return { ...state, username: null, isVerified: false };
    default:
      return state;
  }
};
