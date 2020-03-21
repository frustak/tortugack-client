import React from 'react';
import styles from './Game.module.css';
import GameMap from './GameMap/GameMap';
import GameInfo from './GameInfo/GameInfo';
import GameAction from './GameAction/GameAction';
import VoteCards from './VoteCards/VoteCards';

function Game(props) {
  return (
    <div className={styles.Game}>
      <GameMap data={props.data.gameStatus} />
      <GameInfo data={props.data.gameStatus} username={props.username} />
      <VoteCards data={props.data.gameStatus} />
      <GameAction
        data={props.data.gameStatus}
        sendAction={props.sendAction}
        username={props.username}
      />
    </div>
  );
}

export default Game;
