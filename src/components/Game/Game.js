import React, { useState } from 'react';
import styles from './Game.module.css';
import GameMap from './GameMap/GameMap';
import GameInfo from './GameInfo/GameInfo';
import GameAction from './GameAction/GameAction';
import VoteCards from './VoteCards/VoteCards';

function Game(props) {
  const [voteClickable, setVoteClickable] = useState(false);

  return (
    <div className={styles.Game}>
      <div className={styles.row}>
        <GameMap data={props.data.gameStatus} />
        <GameAction
          data={props.data.gameStatus}
          sendAction={props.sendAction}
          username={props.username}
          showModal={props.showModal}
          moveHandler={props.moveHandler}
          putChestHandler={props.putChestHandler}
          setVoteClickable={setVoteClickable}
          moveChestHandler={props.moveChestHandler}
          maroonHandler={props.maroonHandler}
          viewTwoCardsHandler={props.viewTwoCardsHandler}
          revealCardHandler={props.revealCardHandler}
        />
        <VoteCards
          data={props.data.gameStatus}
          show={props.modal}
          close={props.closeModal}
          vote={props.vote}
          clickable={voteClickable}
        />
      </div>
      <GameInfo data={props.data.gameStatus} username={props.username} />
    </div>
  );
}

export default Game;
