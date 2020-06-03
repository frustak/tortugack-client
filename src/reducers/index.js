import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import lobbyReducer from './lobbyReducer';
import modalReducer from './modalReducer';
import gameReducer from './gameReducer';
import loadingReducer from './loadingReducer';

export default combineReducers({
  form: formReducer,
  error: errorReducer,
  user: userReducer,
  lobby: lobbyReducer,
  modal: modalReducer,
  game: gameReducer,
  loading: loadingReducer,
});
