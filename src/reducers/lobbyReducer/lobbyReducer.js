import {
  LOBBIES_FETCH,
  LOBBY_JOIN,
  LOBBY_FETCH,
  LOBBY_LEAVE,
  LOBBY_CREATE,
  LOBBY_START_POLLING,
  LOBBY_STOP_POLLING,
} from '../../constants/actionTypes';

const INITIAL_STATE = {
  lobbies: null,
  currentLobby: null,
  pollTimer: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOBBIES_FETCH:
      return { ...state, lobbies: action.lobbies };
    case LOBBY_JOIN:
      return { ...state, currentLobby: action.data };
    case LOBBY_FETCH:
      return { ...state, currentLobby: action.data };
    case LOBBY_CREATE:
      return { ...state };
    case LOBBY_LEAVE:
      return { ...state, currentLobby: null };
    case LOBBY_START_POLLING:
      return { ...state, pollTimer: action.timer };
    case LOBBY_STOP_POLLING:
      return { ...state };
    default:
      return state;
  }
};
