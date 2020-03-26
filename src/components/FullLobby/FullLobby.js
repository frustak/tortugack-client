import React from 'react';
import Lobby from '../Lobbies/Lobby/Lobby';
import Button from '@material-ui/core/Button';
import styles from './FullLobby.module.css';

function FullLobby(props) {
  let output = null;
  if (props.data.canStart) {
    output = (
      <Button
        variant="outlined"
        color="primary"
        onClick={props.start}
        className={styles.Button}
      >
        start
      </Button>
    );
  }

  return (
    <div className={styles.FullLobby}>
      <Lobby data={props.data.lobby} />
      {output}
      <Button
        variant="outlined"
        color="secondary"
        onClick={props.leave}
        className={styles.Button}
      >
        leave
      </Button>
    </div>
  );
}

export default FullLobby;
