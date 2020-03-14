import React from 'react';
import styles from './Lobby.module.css';

function Lobby(props) {
  const lobbies = props.data.lobbies.map(lobby => (
    <>
      <p>id: {lobby.id}</p>
      <p>size: {lobby.size}</p>
      <p>occupy: {lobby.occupy}</p>
      <p>host: {lobby.host.username}</p>
      {lobby.players.map((player, index) => (
        <p>
          player {index + 1}: {player.username}
        </p>
      ))}
      <button onClick={props.startGame}>start</button>
    </>
  ));

  return <div className={styles.Lobby}>{lobbies}</div>;
}

export default Lobby;
