import React from 'react';
import Lobby from '../Lobbies/Lobby/Lobby';

function FullLobby(props) {
  return (
    <>
      <Lobby data={props.data} />
      <button onClick={props.start}>start</button>
      <button onClick={props.leave}>leave</button>
    </>
  );
}

export default FullLobby;
