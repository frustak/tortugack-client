import * as types from '../../constants/actionTypes';
import api from '../../apis/api';
import history from '../../history';

export const fetchLobbies = () => async dispatch => {
  const response = await api.get('/lobby');
  dispatch({
    type: types.LOBBIES_FETCH,
    lobbies: response.data.lobbies,
  });
};

export const joinLobby = lobbyId => async dispatch => {
  const response = await api.patch('/lobby/join', { lobbyId });
  dispatch({
    type: types.LOBBY_JOIN,
    data: response.data,
  });
  history.push('/full-lobby');
};

export const fetchLobby = () => async dispatch => {
  const response = await api.get('/lobby/my-lobby');
  dispatch({
    type: types.LOBBY_FETCH,
    data: response.data,
  });
};

export const leaveLobby = () => async (dispatch, getState) => {
  const lobbyId = getState().lobby.currentLobby.lobby.id;
  await api.put('/lobby/leave', { lobbyId });
  dispatch({
    type: types.LOBBY_LEAVE,
  });
  history.push('/main-menu');
};

export const createLobby = () => async dispatch => {
  await api.post('/lobby');
  dispatch({
    type: types.LOBBY_CREATE,
  });
  history.push('/full-lobby');
};

export const startLobbyPolling = () => async (dispatch, getState) => {
  await dispatch(fetchLobby());
  const pollTimer = setInterval(async () => {
    await dispatch(fetchLobby());
    const isGameStarted = getState().lobby.currentLobby.lobby.gameStarted;
    if (isGameStarted) history.push('/game');
  }, 5000);
  dispatch({
    type: types.LOBBY_START_POLLING,
    timer: pollTimer,
  });
};

export const stopLobbyPolling = () => (dispatch, getState) => {
  const timer = getState().lobby.pollTimer;
  clearInterval(timer);
  dispatch({
    type: types.LOBBY_STOP_POLLING,
  });
};
