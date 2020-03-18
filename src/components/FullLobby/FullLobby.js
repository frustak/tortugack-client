import React from 'react';
import Lobby from '../Lobbies/Lobby/Lobby';

function FullLobby(props) {
  let output = null;
  if (props.data.can_start) {
    output = <button onClick={props.start}>start</button>;
  }

  return (
    <>
      <Lobby data={props.data.lobby} />
      {output}
      <button onClick={props.leave}>leave</button>
    </>
  );
}

export default FullLobby;
