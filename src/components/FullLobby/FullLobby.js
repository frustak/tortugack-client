import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import styles from './FullLobby.module.css';
import { startGame } from '../../actions/gameActions/gameActions';
import {
  leaveLobby,
  startLobbyPolling,
  stopLobbyPolling,
} from '../../actions/lobbyActions/lobbyActions';
import Lobby from '../Lobbies/Lobby/Lobby';

function FullLobby({
  lobbyData,
  startLobbyPolling,
  stopLobbyPolling,
  startGame,
  leaveLobby,
}) {
  useEffect(() => {
    startLobbyPolling();
    return stopLobbyPolling;
  }, [startLobbyPolling, stopLobbyPolling]);

  const renderButton = () => {
    return lobbyData.canStart ? (
      <Button
        variant="outlined"
        color="primary"
        onClick={startGame}
        className={styles.button}
      >
        start
      </Button>
    ) : null;
  };

  if (!lobbyData || !lobbyData.lobby) return null;

  return (
    <div className={styles.fullLobby}>
      <Lobby data={lobbyData.lobby} />
      {renderButton()}
      <Button
        variant="outlined"
        color="secondary"
        onClick={leaveLobby}
        className={styles.button}
      >
        leave
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    lobbyData: state.lobby.currentLobby,
  };
};

export default connect(mapStateToProps, {
  startLobbyPolling,
  leaveLobby,
  stopLobbyPolling,
  startGame,
})(FullLobby);
