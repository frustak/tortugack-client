import React from 'react';
import styles from './Game.module.css';
import GameMap from './GameMap/GameMap';
import GameInfo from './GameInfo/GameInfo';

function Game(props) {
  return (
    <div className={styles.Game}>
      <div>
        <GameMap />
      </div>
      <div>
        <GameInfo data={props.data} />
      </div>
    </div>
  );
}

export default Game;
