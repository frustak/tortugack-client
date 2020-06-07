import {
  FETCH_GAME,
  START_GAME_POLLING,
  STOP_GAME_POLLING,
  LEAVE_GAME,
} from '../actions/types';

const INITIAL_STATE = {
  data: null,
  pollTimer: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_GAME:
      return { ...state, data: action.payload };
    case START_GAME_POLLING:
      return { ...state, pollTimer: action.payload };
    case STOP_GAME_POLLING:
      return { ...state, pollTimer: null };
    case LEAVE_GAME:
      return { ...state, data: null };
    default:
      return state;
  }
};
