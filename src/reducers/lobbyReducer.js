import {
  FETCH_LOBBIES,
  JOIN_LOBBY,
  START_LOBBY_POLLING,
  FETCH_LOBBY,
  LEAVE_LOBBY,
} from '../actions/types';

const INITIAL_STATE = {
  lobbies: null,
  currentLobby: null,
  pollTimer: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOBBIES:
      return { ...state, lobbies: action.payload };
    case FETCH_LOBBY:
      return { ...state, currentLobby: action.payload };
    case JOIN_LOBBY:
      return { ...state, currentLobby: action.payload };
    case START_LOBBY_POLLING:
      return { ...state, pollTimer: action.payload };
    case LEAVE_LOBBY:
      return { ...state, currentLobby: null };
    default:
      return state;
  }
};
