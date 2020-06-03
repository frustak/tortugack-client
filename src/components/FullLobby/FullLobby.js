import React from 'react';
import Lobby from '../Lobbies/Lobby/Lobby';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import styles from './FullLobby.module.css';
import {
  startLobbyPolling,
  leaveLobby,
  endLobbyPolling,
  startGame,
} from '../../actions';

class FullLobby extends React.Component {
  componentDidMount() {
    this.props.startLobbyPolling();
  }

  componentWillUnmount() {
    this.props.endLobbyPolling();
  }

  render() {
    if (!this.props.lobbyData || !this.props.lobbyData.lobby) return null;

    let output = null;
    if (this.props.lobbyData.canStart) {
      output = (
        <Button
          variant="outlined"
          color="primary"
          onClick={this.props.startGame}
          className={styles.Button}
        >
          start
        </Button>
      );
    }

    return (
      <div className={styles.FullLobby}>
        <Lobby data={this.props.lobbyData.lobby} />
        {output}
        <Button
          variant="outlined"
          color="secondary"
          onClick={this.props.leaveLobby}
          className={styles.Button}
        >
          leave
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { lobbyData: state.lobby.currentLobby };
};

export default connect(mapStateToProps, {
  startLobbyPolling,
  leaveLobby,
  endLobbyPolling,
  startGame,
})(FullLobby);
