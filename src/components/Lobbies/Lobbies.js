import React from 'react';
import Lobby from './Lobby/Lobby';
import styles from './Lobbies.module.css';
import Button from '@material-ui/core/Button';

function Lobbies(props) {
  const lobbies = props.lobbies.map(lobby => (
    <Lobby data={lobby} key={lobby.id} showBtn joinLobby={props.joinLobby}/>
  ));

  return (
    <>
      <div className={styles.Buttons}>
        <Button color="primary" onClick={props.refresh}>
          refresh
        </Button>
        <Button color="secondary" onClick={props.back}>
          back
        </Button>
      </div>
      <div className={styles.Lobbies}>{lobbies}</div>
    </>
  );
}

export default Lobbies;
