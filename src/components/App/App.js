import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';
import MainMenu from '../MainMenu/MainMenu';
import Lobbies from '../Lobbies/Lobbies';
import FullLobby from '../FullLobby/FullLobby';
import Game from '../Game/Game';

import { setToken, getToken, deleteToken } from '../../helpers/cookie-helper';
import createAxios from '../../services/axios';
import jwtDecode from 'jwt-decode';

const ROUTES = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  MAIN_MENU: '/main-menu',
  GAME: '/game',
  LOBBIES: '/lobbies',
  FULL_LOBBY: '/full_lobby',
};

class App extends Component {
  state = {
    route: ROUTES.ROOT,
    loading: false,
    username: null,
    lobbies: [],
    lobbyData: null,
    gameData: null,
  };

  pollTime = 10000;

  verifyUser = async () => {
    const token = getToken();
    const response = await this.axios.post('/token/verify', { token });
    if (response.data.valid) {
      this.setState({ route: ROUTES.MAIN_MENU });
      const username = jwtDecode(token).username;
      this.setState({ username });
    } else {
      this.setState({ route: ROUTES.SIGN_IN });
    }
  };

  usernameHandler = event => {
    this.setState({ username: event.target.value });
  };

  login = async () => {
    const data = { username: this.state.username };
    const response = await this.axios.post('/token', data);

    setToken(response.data.access_token);
    this.setState({ route: ROUTES.MAIN_MENU });
  };

  logout = () => {
    deleteToken();
    this.setState({ route: ROUTES.SIGN_IN });
  };

  createLobby = async () => {
    const response = await this.axios.post('/lobby');

    this.setState({
      route: ROUTES.FULL_LOBBY,
      lobbyData: response.data.lobby,
    });

    this.startLobbyPolling();
  };

  showLobbies = async () => {
    const response = await this.axios.get('/lobby');
    this.setState({
      route: ROUTES.LOBBIES,
      lobbies: response.data.lobbies,
    });
  };

  lobbiesGoBack = () => {
    this.setState({ route: ROUTES.MAIN_MENU });
  };

  joinLobby = async () => {
    const lobbyID = prompt('enter lobby id');
    const data = { lobby_id: lobbyID };
    let response;

    try {
      response = await this.axios.patch('/lobby/join', data);
    } catch (error) {
      alert('nagard nist gashtam nabod :(');
      return;
    }

    this.setState({
      route: ROUTES.FULL_LOBBY,
      lobbyData: response.data.lobby,
    });

    this.startLobbyPolling();
  };

  leaveLobby = async () => {
    const lobbyID = this.state.lobbyData.id;
    const data = { lobby_id: lobbyID };
    const response = await this.axios.put('/lobby/leave', data);

    this.setState({
      route: ROUTES.MAIN_MENU,
      lobbyData: null,
    });

    this.endLobbyPolling();
  };

  startGame = async () => {
    const lobbyID = this.state.lobbyData.id;
    const data = { lobby_id: lobbyID };
    const response = await this.axios.post('/lobby/start', data);
    this.endLobbyPolling();
    this.startGamePolling();
  };

  startLobbyPolling = () => {
    this.pollTimer = setInterval(async () => {
      const response = await this.axios.get('/lobby/my-lobby');
      const data = response.data.lobby;
      this.setState({ lobbyData: data });
    }, this.pollTime);
  };

  endLobbyPolling = () => {
    clearInterval(this.pollTimer);
  };

  startGamePolling = async () => {
    const request = async () => {
      const response = await this.axios.get('/game/my-game');
      const data = response.data.game_status;
      this.setState({ gameData: data });
    };
    await request();
    this.setState({ route: ROUTES.GAME });
    this.pollTimer = setInterval(request, this.pollTime);
  };

  endGamePolling = () => {
    clearInterval(this.pollTimer);
  };

  componentDidMount = () => {
    this.axios = createAxios(
      () => this.setState({ loading: true }),
      () => this.setState({ loading: false })
    );

    this.verifyUser();
  };

  render = () => {
    let output;

    switch (this.state.route) {
      case ROUTES.SIGN_IN:
        output = (
          <SignIn usernameHandler={this.usernameHandler} login={this.login} />
        );
        break;
      case ROUTES.MAIN_MENU:
        output = (
          <MainMenu
            username={this.state.username}
            logout={this.logout}
            showLobbies={this.showLobbies}
            createLobby={this.createLobby}
            joinLobby={this.joinLobby}
          />
        );
        break;
      case ROUTES.LOBBIES:
        output = (
          <Lobbies
            lobbies={this.state.lobbies}
            back={this.lobbiesGoBack}
            refresh={this.showLobbies}
          />
        );
        break;
      case ROUTES.FULL_LOBBY:
        output = (
          <FullLobby
            username={this.state.username}
            data={this.state.lobbyData}
            leave={this.leaveLobby}
            start={this.startGame}
          />
        );
        break;
      case ROUTES.GAME:
        output = <Game data={this.state.gameData} />;
        break;
      default:
        output = <p>root</p>; // FIXME: maybe something else? or change root name?
    }

    return <>{this.state.loading ? <p>loading...</p> : output}</>;
  };
}

export default App;
