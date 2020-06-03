import { LOGIN, VERIFY_USER } from '../actions/types';

const INITIAL_STATE = {
  username: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, username: action.payload.username };
    case VERIFY_USER:
      return { ...state, username: action.payload.username };
    default:
      return state;
  }
};
