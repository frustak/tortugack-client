import React from 'react';

function Lobby(props) {
  const data = props.data;
  const players = data.players.map((player, index) => (
    <p key={index}>
      player {index + 1}: {player.username}
    </p>
  ));

  return (
    <>
      <p>id: {data.id}</p>
      <p>size: {data.size}</p>
      <p>occupy: {data.occupy}</p>
      <p>host: {data.host.username}</p>
      <p>game started: {data.game_started.toString()}</p>
      {players}
    </>
  );
}

export default Lobby;
