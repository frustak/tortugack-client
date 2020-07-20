import {
  GAME_START,
  GAME_FETCH,
  GAME_DO_ACTION,
  GAME_LEAVE,
  GAME_START_POLLING,
  GAME_STOP_POLLING,
  GAME_SET_PLAYERS,
} from '../../constants/actionTypes';

const INITIAL_STATE = {
  data: null,
  pollTimer: null,
  players: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GAME_START:
      return { ...state };
    case GAME_FETCH:
      return { ...state, data: action.data };
    case GAME_DO_ACTION:
      return { ...state };
    case GAME_LEAVE:
      return { ...state, data: null };
    case GAME_START_POLLING:
      return { ...state, pollTimer: action.timer };
    case GAME_STOP_POLLING:
      return { ...state, pollTimer: null };
    case GAME_SET_PLAYERS:
      return { ...state, players: action.players };
    default:
      return state;
  }
};
