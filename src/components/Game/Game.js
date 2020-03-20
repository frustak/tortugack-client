import React from 'react';
import GameMap from './GameMap/GameMap';
import GameInfo from './GameInfo/GameInfo';

function Game(props) {
  return (
    <>
      <GameMap data={props.data} />
      <GameInfo data={props.data} />
      <GameAction />
    </div>
  );
}

export default Game;
