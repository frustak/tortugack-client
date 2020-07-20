import _ from 'lodash';

import * as types from '../../constants/actionTypes';
import api from '../../apis/api';
import history from '../../history';
import { hideModal } from '../modalActions/modalActions';

export const startGame = () => async (dispatch, getState) => {
  const lobbyId = getState().lobby.currentLobby.lobby.id;
  await api.post('/lobby/start', { lobbyId });
  dispatch({
    type: types.GAME_START,
  });
  history.push('/game');
};

export const fetchGame = () => async dispatch => {
  const response = await api.get('/game/my-game');
  dispatch({
    type: types.GAME_FETCH,
    data: response.data,
  });
};

export const leaveGame = () => async dispatch => {
  await api.get('/game/leave');
  dispatch(hideModal());
  history.push('/main-menu');
  dispatch({
    type: types.GAME_LEAVE,
  });
  dispatch(stopGamePolling());
};

export const doGameAction = (actionType, payload) => async (dispatch, getState) => {
  await api.post('/game/action', {
    gameId: getState().game.data.gameId,
    action: { actionType },
    payload,
  });
  dispatch({
    type: types.GAME_DO_ACTION,
  });
  await dispatch(fetchGame());
};

export const startGamePolling = () => async dispatch => {
  await dispatch(fetchGame());
  const pollTimer = setInterval(() => dispatch(fetchGame()), 5000);
  dispatch({
    type: types.GAME_START_POLLING,
    timer: pollTimer,
  });
};

export const stopGamePolling = () => (dispatch, getState) => {
  const pollTimer = getState().game.pollTimer;
  clearInterval(pollTimer);
  dispatch({
    type: types.GAME_STOP_POLLING,
  });
};

export const setPlayers = () => (dispatch, getState) => {
  const { playersPosition } = getState().game.data.gameStatus;
  const players = _.keys(playersPosition);
  dispatch({
    type: types.GAME_SET_PLAYERS,
    players,
  });
};
