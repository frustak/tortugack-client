import React from 'react';
import Lobby from './Lobby/Lobby';

function Lobbies(props) {
  const lobbies = props.lobbies.map(lobby => (
    <Lobby data={lobby} key={lobby.id} />
  ));

  return (
    <>
      <button onClick={props.back}>back</button>
      <button onClick={props.refresh}>refresh</button>
      <p>lobbies:</p>
      <hr />
      {lobbies}
    </>
  );
}

export default Lobbies;
