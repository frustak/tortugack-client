import jwtDecode from 'jwt-decode';
import React from 'react';

import RevealedEventCard from '../components/UI/modal-contents/Modals/TwoEventCardsModal/RevealedEventCard/RevealedEventCard';
import tortuga from '../apis/tortuga';
import { setToken, getToken } from '../helpers/cookie-helper';
import {
  LOGIN,
  DISPLAY_ERROR,
  CLOSE_ERROR,
  VERIFY_USER,
  FETCH_LOBBIES,
  CLOSE_MODAL,
  OPEN_MODAL,
  JOIN_LOBBY,
  FETCH_LOBBY,
  START_LOBBY_POLLING,
  LEAVE_LOBBY,
  STOP_LOBBY_POLLING,
  CREATE_LOBBY,
  START_GAME,
  START_GAME_POLLING,
  STOP_GAME_POLLING,
  FETCH_GAME,
  GAME_ACTION,
  CLOSE_LOADING,
  DISPLAY_LOADING,
} from './types';
import history from '../history';

const POLL_TIME = 5000;

export const login = () => async (dispatch, getState) => {
  const enteredUsername = getState().form.loginForm.values?.username;
  if (!enteredUsername) return;
  const data = { username: enteredUsername };
  const response = await tortuga.post('/token', data);
  const token = response.data.accessToken;
  setToken(token);
  const username = jwtDecode(token).username;
  dispatch({ type: LOGIN, payload: { username } });
  history.push('/main-menu');
};

export const verifyUser = () => async dispatch => {
  const token = getToken();
  const response = await tortuga.post('/token/verify', { token });
  if (response.data.valid) {
    const username = jwtDecode(token).username;
    dispatch({ type: VERIFY_USER, payload: { username } });
    dispatch(checkUserState());
  } else {
    history.push('/login');
  }
};

export const fetchLobbies = () => async dispatch => {
  const response = await tortuga.get('/lobby');
  dispatch({ type: FETCH_LOBBIES, payload: response.data.lobbies });
};

export const joinLobby = lobbyId => async dispatch => {
  const response = await tortuga.patch('/lobby/join', { lobbyId });
  dispatch({ type: JOIN_LOBBY, payload: response.data });
  history.push('/full-lobby');
};

export const startLobbyPolling = () => async dispatch => {
  dispatch(fetchLobby());
  const pollTimer = setInterval(() => dispatch(fetchLobby()), POLL_TIME);
  dispatch({ type: START_LOBBY_POLLING, payload: pollTimer });
};

export const fetchLobby = () => async dispatch => {
  const response = await tortuga.get('/lobby/my-lobby');
  dispatch({ type: FETCH_LOBBY, payload: response.data });
};

export const checkUserState = () => async dispatch => {
  const lobbyResponse = await tortuga.get('/lobby/my-lobby');
  if (lobbyResponse.data.hasLobby) {
    dispatch({ type: FETCH_LOBBY, payload: lobbyResponse.data });
    history.push('/full-lobby');
    return;
  }
  const gameResponse = await tortuga.get('/game/my-game');
  if (gameResponse.data.hasGame) {
    history.push('/game');
    return;
  }
  history.push('/main-menu');
};

export const displayError = errorMsg => {
  return { type: DISPLAY_ERROR, payload: { errorMsg } };
};

export const closeError = () => {
  return { type: CLOSE_ERROR };
};

export const handleModal = (open, content) => {
  if (open) return { type: OPEN_MODAL, payload: content };
  else return { type: CLOSE_MODAL };
};

export const leaveLobby = () => async (dispatch, getState) => {
  const lobbyId = getState().lobby.currentLobby.lobby.id;
  await tortuga.put('/lobby/leave', { lobbyId });
  dispatch({ type: LEAVE_LOBBY });
  history.push('/main-menu');
};

export const createLobby = () => async dispatch => {
  await tortuga.post('/lobby');
  dispatch({ type: CREATE_LOBBY });
  history.push('/full-lobby');
};

export const endLobbyPolling = () => (dispatch, getState) => {
  clearInterval(getState().lobby.pollTimer);
  dispatch({ type: STOP_LOBBY_POLLING });
};

export const startGame = () => async (dispatch, getState) => {
  const lobbyId = getState().lobby.currentLobby.lobby.id;
  await tortuga.post('/lobby/start', { lobbyId });
  dispatch({ type: START_GAME });
  history.push('/game');
};

export const startGamePolling = () => async dispatch => {
  dispatch(fetchGame());
  const pollTimer = setInterval(() => dispatch(fetchGame()), POLL_TIME);
  dispatch({ type: START_GAME_POLLING, payload: pollTimer });
};

export const fetchGame = () => async dispatch => {
  const response = await tortuga.get('/game/my-game');
  dispatch({ type: FETCH_GAME, payload: response.data });
};

export const stopGamePolling = () => async (dispatch, getState) => {
  const pollTimer = getState().game.pollTimer;
  clearInterval(pollTimer);
  dispatch({ type: STOP_GAME_POLLING });
};

export const sendGameAction = (actionType, payload) => {
  return async (dispatch, getState) => {
    const data = {
      gameId: getState().game.data.gameId,
      action: { actionType },
      payload,
    };
    await tortuga.post('/game/action', data);
    dispatch({ type: GAME_ACTION });
    await dispatch(fetchGame());
  };
};

export const showLastRevealedCard = () => async dispatch => {
  const response = await tortuga.get('/game/my-game');
  const cardData = response.data.gameStatus.lastAction.actionData.eventCard;
  dispatch(
    handleModal(
      true,
      <RevealedEventCard
        title={cardData.title}
        description={cardData.description}
        imageUrl={cardData.imageUrl}
      />
    )
  );
};

export const displayLoading = () => {
  return { type: DISPLAY_LOADING };
};

export const closeLoading = () => {
  return { type: CLOSE_LOADING };
};
