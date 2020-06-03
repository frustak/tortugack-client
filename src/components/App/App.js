import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../../history';
import styles from './App.module.css';
import LoginForm from '../LoginForm/LoginForm';
import MainMenu from '../MainMenu/MainMenu';
import { verifyUser } from '../../actions';
import Lobbies from '../Lobbies/Lobbies';
import ModalView from '../ModalView/ModalView';
import FullLobby from '../FullLobby/FullLobby';
import Game from '../Game/Game';
import Warning from '../UI/Warning/Warning';
import Loading from '../UI/Loading/Loading';

class App extends React.Component {
  componentDidMount() {
    this.props.verifyUser();
  }

  render() {
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
}

export default connect(null, { verifyUser })(App);
