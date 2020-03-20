import React from 'react';
import styles from './Game.module.css';
import GameMap from './GameMap/GameMap';
import GameInfo from './GameInfo/GameInfo';
import GameAction from './GameAction/GameAction';

function Game(props) {
  return (
    <div className={styles.Game}>
      <GameMap data={props.data} />
      <GameInfo data={props.data} />
      <GameAction />
    </div>
  );
}

export default Game;
