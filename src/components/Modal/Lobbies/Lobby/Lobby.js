import React from 'react';
import styles from './Lobby.module.css';

function Lobby(props) {
  const players = props.data.players.map((player, index) => (
    <p>
      player {index + 1}: {player.username}
    </p>
  ));

  return (
    <div className={styles.Lobby}>
      <p>id: {props.data.id}</p>
      <p>size: {props.data.size}</p>
      <p>occupy: {props.data.occupy}</p>
      <p>host: {props.data.host.username}</p>
      {players}
    </div>
  );
}

export default Lobby;
