import React from 'react';
import Lobby from '../Lobbies/Lobby/Lobby';

function FullLobby(props) {
  let output = null;
  if (props.data.host.username === props.username) {
    output = <button onClick={props.start}>start</button>;
  }

  return (
    <>
      <Lobby data={props.data} />
      {output}
      <button onClick={props.leave}>leave</button>
    </>
  );
}

export default FullLobby;
