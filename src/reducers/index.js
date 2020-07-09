import { combineReducers } from 'redux';

import errorReducer from './errorReducer/errorReducer';
import userReducer from './userReducer/userReducer';
import lobbyReducer from './lobbyReducer/lobbyReducer';
import modalReducer from './modalReducer/modalReducer';
import gameReducer from './gameReducer/gameReducer';
import loadingReducer from './loadingReducer/loadingReducer';

export default combineReducers({
  error: errorReducer,
  user: userReducer,
  lobby: lobbyReducer,
  modal: modalReducer,
  game: gameReducer,
  loading: loadingReducer,
});
