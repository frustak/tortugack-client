import React, { Component } from 'react';
import SignIn from '../SignIn/SignIn';
import MainMenu from '../MainMenu/MainMenu';
import Lobbies from '../Lobbies/Lobbies';
import FullLobby from '../FullLobby/FullLobby';
import Game from '../Game/Game';
import Loading from '../Loading/Loading';

import withCssBaseline from '../../hoc/with-css-baseline';

import { setToken, getToken, deleteToken } from '../../helpers/cookie-helper';
import createAxios from '../../services/axios';
import jwtDecode from 'jwt-decode';
import Warning from '../Warning/Warning';
import MainModal from '../MainModal/MainModal';
import MoveModal from '../Modals/MoveModal/MoveModal';
import PutChestModal from '../Modals/PutChestModal/PutChestModal';
import JoinLobbyModal from '../Modals/JoinLobbyModal/JoinLobbyModal';
import MoveChestModal from '../Modals/MoveChestModal/MoveChestModal';
import MaroonModal from '../Modals/MaroonModal/MaroonModal';
import Disabled from '../Disabled/Disabled';
import TwoEventCardsModal from '../Modals/TwoEventCardsModal/TwoEventCardsModal';

const ROUTES = {
  ROOT: '/',
  SIGN_IN: '/sign-in',
  MAIN_MENU: '/main-menu',
  GAME: '/game',
  LOBBIES: '/lobbies',
  FULL_LOBBY: '/full-lobby',
};

class App extends Component {
  state = {
    route: ROUTES.ROOT,
    warning: false,
    loading: false,
    modal: false,
    username: null,
    lobbies: [],
    lobbyData: null,
    gameData: null,
    mainModal: false,
    warningMsg: null,
    isDisabled: false,
    mainModalContent: null,
  };

  pollTime = 5000;

  checkUserState = async () => {
    const lobbyResponse = await this.axios.get('/lobby/my-lobby');
    if (lobbyResponse.data.hasLobby) {
      this.setState({
        route: ROUTES.FULL_LOBBY,
        lobbyData: lobbyResponse.data,
      });
      this.startLobbyPolling();
      return;
    }

    const gameResponse = await this.axios.get('/game/my-game');
    if (gameResponse.data.hasGame) {
      this.startGamePolling();
      return;
    }
  };

  verifyUser = async () => {
    const token = getToken();
    const response = await this.axios.post('/token/verify', { token });
    if (response.data.valid) {
      this.setState({ route: ROUTES.MAIN_MENU });
      const username = jwtDecode(token).username;
      this.setState({ username });
      this.checkUserState();
    } else {
      this.setState({ route: ROUTES.SIGN_IN });
    }
  };

  usernameHandler = (event) => {
    this.setState({ username: event.target.value });
  };

  login = async () => {
    const data = { username: this.state.username };
    const response = await this.axios.post('/token', data);

    setToken(response.data.accessToken);
    this.setState({ route: ROUTES.MAIN_MENU });
    this.checkUserState();
  };

  logout = () => {
    deleteToken();
    this.setState({ route: ROUTES.SIGN_IN });
  };

  createLobby = async () => {
    await this.axios.post('/lobby');
    const response = await this.axios.get('/lobby/my-lobby');

    this.setState({
      route: ROUTES.FULL_LOBBY,
      lobbyData: response.data,
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

  joinLobby = async (lobbyId) => {
    const data = { lobbyId };
    let response;
    response = await this.axios.patch('/lobby/join', data);
    this.setState({
      route: ROUTES.FULL_LOBBY,
      lobbyData: response.data,
    });
    this.startLobbyPolling();
  };

  leaveLobby = async () => {
    const lobbyID = this.state.lobbyData.lobby.id;
    const data = { lobbyId: lobbyID };
    await this.axios.put('/lobby/leave', data);

    this.setState({
      route: ROUTES.MAIN_MENU,
      lobbyData: null,
    });

    this.endLobbyPolling();
  };

  startGame = async () => {
    const lobbyID = this.state.lobbyData.lobby.id;
    const data = { lobbyId: lobbyID };
    await this.axios.post('/lobby/start', data);
    this.endLobbyPolling();
    this.startGamePolling();
  };

  startLobbyPolling = () => {
    this.pollTimer = setInterval(async () => {
      const response = await this.axios.get('/lobby/my-lobby');
      const data = response.data;
      this.setState({ lobbyData: data });
      if (data.lobby.gameStarted) {
        this.endLobbyPolling();
        this.startGamePolling();
      }
    }, this.pollTime);
  };

  endLobbyPolling = () => {
    clearInterval(this.pollTimer);
  };

  reloadGame = async () => {
    const response = await this.axios.get('/game/my-game');
    const data = response.data;
    this.setState({ gameData: data });
  };

  startGamePolling = async () => {
    await this.reloadGame();
    this.setState({ route: ROUTES.GAME });
    this.pollTimer = setInterval(this.reloadGame, this.pollTime);
  };

  endGamePolling = () => {
    clearInterval(this.pollTimer);
  };

  sendAction = async (actionType, payload) => {
    const data = {
      gameId: this.state.gameData.gameId,
      action: {
        actionType,
      },
      payload,
    };
    await this.axios.post('/game/action', data);
    this.reloadGame();
  };

  closeWarning = () => {
    this.setState({ warning: false });
  };

  showModal = () => {
    this.setState({ modal: true });
  };

  closeModal = () => {
    this.setState({ modal: false });
  };

  closeMainModal = () => {
    this.setState({ mainModal: false });
  };

  joinHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'JoinLobbyModal' });
  };

  viewTwoCardsHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'TwoEventCardsModal' });
  };

  moveHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'MoveModal' });
  };

  putChestHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'PutChestModal' });
  };

  maroonHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'MaroonModal' });
  };

  moveChestHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'MoveChestModal' });
  };

  componentDidMount = () => {
    let timeoutID;
    this.axios = createAxios(
      () => {
        timeoutID = setTimeout(() => this.setState({ loading: true }), 1000);
        this.setState({ isDisabled: true });
      },
      () => {
        clearTimeout(timeoutID);
        this.setState({ loading: false });
        this.setState({ isDisabled: false });
      },
      (msg) => {
        this.setState({ warning: true, warningMsg: msg });
      }
    );
    this.verifyUser();
  };

  vote = (voteCardIndex) => {
    const payload = { voteCardIndex };
    this.sendAction('vote', payload);
    this.setState({ modal: false });
  };

  render = () => {
    let output;
    let modalContent;

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
            joinLobby={this.joinHandler}
          />
        );
        break;
      case ROUTES.LOBBIES:
        output = (
          <Lobbies
            lobbies={this.state.lobbies}
            back={this.lobbiesGoBack}
            refresh={this.showLobbies}
            joinLobby={this.joinLobby}
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
        output = (
          <Game
            data={this.state.gameData}
            username={this.state.username}
            sendAction={this.sendAction}
            showModal={this.showModal}
            modal={this.state.modal}
            closeModal={this.closeModal}
            vote={this.vote}
            moveHandler={this.moveHandler}
            putChestHandler={this.putChestHandler}
            moveChestHandler={this.moveChestHandler}
            maroonHandler={this.maroonHandler}
            viewTwoCardsHandler={this.viewTwoCardsHandler}
          />
        );
        break;
      default:
        output = <></>;
    }

    switch (this.state.mainModalContent) {
      case 'JoinLobbyModal':
        modalContent = (
          <JoinLobbyModal join={this.joinLobby} close={this.closeMainModal} />
        );
        break;
      case 'TwoEventCardsModal':
        modalContent = (
          <TwoEventCardsModal
            data={this.state.gameData}
            sendAction={this.sendAction}
            close={this.closeMainModal}
          />
        );
        break;
      case 'MoveModal':
        const currentPosition = this.state.gameData.gameStatus.playersPosition[
          this.state.username
        ];
        modalContent = (
          <MoveModal
            close={this.closeMainModal}
            currentPosition={currentPosition}
            sendAction={this.sendAction}
          />
        );
        break;
      case 'PutChestModal':
        modalContent = (
          <PutChestModal
            data={this.state.gameData.gameStatus}
            close={this.closeMainModal}
            sendAction={this.sendAction}
          />
        );
        break;
      case 'MaroonModal':
        modalContent = (
          <MaroonModal
            data={this.state.gameData.gameStatus}
            close={this.closeMainModal}
            sendAction={this.sendAction}
            username={this.state.username}
          />
        );
        break;
      case 'MoveChestModal':
        modalContent = (
          <MoveChestModal
            data={this.state.gameData.gameStatus}
            username={this.state.username}
            close={this.closeMainModal}
            sendAction={this.sendAction}
          />
        );
        break;
      default:
        modalContent = null;
    }

    return (
      <>
        {output}
        <Loading show={this.state.loading} />
        <Warning
          show={this.state.warning}
          close={this.closeWarning}
          msg={this.state.warningMsg}
        />
        <MainModal
          show={this.state.mainModal}
          close={() => this.setState({ mainModal: false })}
        >
          {modalContent}
        </MainModal>
        <Disabled is={this.state.isDisabled} />
      </>
    );
  };
}

export default withCssBaseline(App);
