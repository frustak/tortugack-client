import React from 'react';
import styles from './Lobbies.module.css';
import Lobby from './Lobby/Lobby';

function Lobbies(props) {
  const lobbies = props.lobbiesData.map(lobbyData => (
    <Lobby data={lobbyData} key={lobbyData.id} />
  ));

  return <div className={styles.Lobbies}>{lobbies}</div>;
}

export default Lobbies;
