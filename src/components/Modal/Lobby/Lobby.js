import React, { useEffect, useRef } from 'react';
import styles from './Lobby.module.css';
import axios from 'axios';

function Lobby(props) {
  let data = useRef();

  useEffect(() => {
    const getLobby = async () => {
      const response = await axios.get(
        'https://tortugack.herokuapp.com/api/v1/lobby'
      );
      return response.data;
    };
    data.current = getLobby();
  }, []);

  const lobbies = data.current.lobbies.map(lobby => (
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
