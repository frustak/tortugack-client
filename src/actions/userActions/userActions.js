import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

import * as types from '../../constants/actionTypes';
import api from '../../apis/api';
import history from '../../history';

export const loginUser = input => async dispatch => {
  const response = await api.post('/token', { username: input });
  const token = response.data.accessToken;
  Cookies.set('token', token);
  const { username } = jwtDecode(token);
  dispatch({
    type: types.USER_LOGIN,
    username,
  });
  history.push('/main-menu');
};

export const verifyUser = () => async dispatch => {
  const token = Cookies.get('token') || '';
  const response = await api.post('/token/verify', { token });
  if (!response.data.valid) {
    history.push('/login');
    return;
  }
  const { username } = jwtDecode(token);
  dispatch({
    type: types.USER_VERIFY,
    username,
  });
};

export const checkUserState = () => async dispatch => {
  let path = '/main-menu';
  const lobbyResponse = await api.get('/lobby/my-lobby');
  if (lobbyResponse.data.hasLobby) {
    path = '/full-lobby';
  }
  const gameResponse = await api.get('/game/my-game');
  if (gameResponse.data.hasGame) {
    path = '/game';
  }
  history.push(path);
  dispatch({
    type: types.USER_CHECK_STATE,
  });
};

export const logoutUser = () => {
  Cookies.remove('token');
  history.push('/login');
  return {
    type: types.USER_LOGOUT,
  };
};
