import React from 'react';
import styles from './Lobbies.module.css';
import Lobby from './Lobby/Lobby';

function Lobbies(props) {
  let lobbies = (
    <p className={styles.Empty}>There's no lobby :( create a new one!</p>
  );

  if (props.lobbiesData.lobbies.length > 0) {
    lobbies = props.lobbiesData.lobbies.map(lobbyData => (
      <Lobby data={lobbyData} key={lobbyData.id} />
    ));
  }

  return <div className={styles.Lobbies}>{lobbies}</div>;
}

export default Lobbies;
