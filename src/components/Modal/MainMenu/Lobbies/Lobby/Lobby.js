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
      <div className={styles.infoCol}>
        <p>id </p>
        <hr />
        <p>size </p>
        <hr />
        <p>occupy </p>
        <hr />
        <p>host </p>
      </div>
      <div className={styles.col}>
        <p>{props.data.id}</p>
        <hr />
        <p>{props.data.size}</p>
        <hr />
        <p>{props.data.occupy}</p>
        <hr />
        <p>{props.data.host.username}</p>
      </div>
      {players}
    </div>
  );
}

export default Lobby;
