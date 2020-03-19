import React from 'react';
import GameMap from './GameMap/GameMap';
import GameInfo from './GameInfo/GameInfo';

function Game(props) {
  return (
    <>
      <GameMap data={props.data} />
      <GameInfo data={props.data} />
    </>
  );
}

export default Game;
