import React from 'react';

function GameInfo(props) {
  return (
    <>
      <p>turn: {props.data.turn.username}</p>
      <p>team: {props.data.player_game_info.team}</p>
    </>
  );
}

export default GameInfo;
