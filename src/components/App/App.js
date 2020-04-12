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
import RevealCardModal from '../Modals/RevealCardModal/RevealCardModal';
import CardOptionModal from '../Modals/CardOptionModal/CardOptionModal';
import WinnerModal from '../Modals/WinnerModal/WinnerModal';
import MyEventsModal from '../Modals/MyEventsModal/MyEventsModal';
import styles from './App.module.css';

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
    seeOptions: false,
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

  usernameHandler = event => {
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

  joinLobby = async lobbyId => {
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

  reloadGame = async callback => {
    const response = await this.axios.get('/game/my-game');
    const data = response.data;
    this.setState({ gameData: data }, callback);
  };

  startGamePolling = async () => {
    await this.reloadGame();
    this.setState({ route: ROUTES.GAME });
    this.pollTimer = setInterval(this.reloadGame, this.pollTime);
  };

  endGamePolling = () => {
    clearInterval(this.pollTimer);
  };

  sendAction = async (actionType, payload, callback) => {
    const data = {
      gameId: this.state.gameData.gameId,
      action: {
        actionType,
      },
      payload,
    };
    await this.axios.post('/game/action', data);
    this.reloadGame(callback);
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

  useEventCardHandler = slug => {
    this.sendAction(
      'SEE-EVENT-CARD-OPTIONS',
      { eventCardToSeeSlug: slug },
      () => {
        this.setState({ seeOptions: true });
      }
    );
  };

  componentDidUpdate() {
    if (!this.state.seeOptions) return;
    const { options } = this.state.gameData.gameStatus.lastAction.actionData;
    if (options.length === 0) {
      this.sendAction('USE-EVENT-CARD');
      this.setState({ seeOptions: false });
      return;
    }
    this.setState({
      mainModal: true,
      mainModalContent: 'CardOptionModal',
      seeOptions: false,
    });
  }

  vote = voteCardIndex => {
    const payload = { voteCardIndex };
    this.sendAction('vote', payload);
    this.setState({ modal: false });
  };

  revealCardHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'RevealCardModal' });
  };

  leaveGameToMenu = () => {
    this.axios.get('/game/leave');
    this.setState({ route: ROUTES.MAIN_MENU, gameData: null });
    this.endGamePolling();
  };

  myEventCardsHandler = () => {
    this.setState({ mainModal: true, mainModalContent: 'MyEventsModal' });
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
      msg => {
        this.setState({ warning: true, warningMsg: msg });
      }
    );
    this.verifyUser();
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
            revealCardHandler={this.revealCardHandler}
            useEventCardHandler={this.useEventCardHandler}
            myEventCardsHandler={this.myEventCardsHandler}
          />
        );
        break;
      default:
        output = null;
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
      case 'RevealCardModal':
        const eventCardsDeckCount = this.state.gameData.gameStatus
          .eventCardsDeckCount;
        modalContent = (
          <RevealCardModal
            eventCardsDeckCount={eventCardsDeckCount}
            sendAction={this.sendAction}
            close={this.closeMainModal}
          />
        );
        break;
      case 'CardOptionModal':
        const { actionData } = this.state.gameData.gameStatus.lastAction;
        const eventCardSlug = actionData?.eventCardSlug;
        const options = actionData?.options;

        modalContent = (
          <CardOptionModal
            options={options}
            slug={eventCardSlug}
            sendAction={this.sendAction}
            close={this.closeMainModal}
          />
        );
        break;
      case 'MyEventsModal':
        modalContent = (
          <MyEventsModal
            cards={this.state.gameData.gameStatus.playerGameInfo.eventCards}
            close={this.closeMainModal}
            eventCardHandler={this.useEventCardHandler}
          />
        );
        break;
      default:
        modalContent = null;
    }

    return (
      <div className={styles.Background}>
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
        {this.state.gameData?.gameStatus?.winner ? (
          <WinnerModal
            winner={this.state.gameData.gameStatus.winner}
            leaveGameToLobby={this.leaveGameToLobby}
            leaveGameToMenu={this.leaveGameToMenu}
          />
        ) : null}
        <Disabled is={this.state.isDisabled} />
      </div>
    );
  };
}

export default withCssBaseline(App);
