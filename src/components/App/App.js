import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';

import { loadSounds } from '../../helpers/audioHelper';
import history from '../../history';
import { verifyUser, checkUserState } from '../../actions/userActions/userActions';
import styles from './App.module.css';
import LoginForm from '../LoginForm/LoginForm';
import MainMenu from '../MainMenu/MainMenu';
import Lobbies from '../Lobbies/Lobbies';
import FullLobby from '../FullLobby/FullLobby';
import Game from '../Game/Game';
import ModalView from '../ModalView/ModalView';
import Warning from '../Warning/Warning';
import Loading from '../Loading/Loading';

function App({ isVerified, verifyUser, checkUserState }) {
  useEffect(() => {
    loadSounds();
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  useEffect(() => {
    if (isVerified) checkUserState();
  }, [isVerified, checkUserState]);

  return (
    <div className={styles.background}>
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={LoginForm} />
          <Route path="/main-menu" exact component={MainMenu} />
          <Route path="/lobbies" exact component={Lobbies} />
          <Route path="/full-lobby" exact component={FullLobby} />
          <Route path="/game" exact component={Game} />
        </Switch>
      </Router>
      <ModalView />
      <Warning />
      <Loading />
    </div>
  );
}

const mapStateToProps = state => {
  return { isVerified: state.user.isVerified };
};

export default connect(mapStateToProps, { verifyUser, checkUserState })(App);
