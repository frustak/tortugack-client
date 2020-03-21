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

const t = {
  gameId: 'BCB98B',
  gameStatus: {
    playersPosition: { frost: 'jr_1', frost2: 'fd_1' },
    chestsPosition: {
      fd_fr: 0,
      fd_en: 0,
      sg_nt: 4,
      jr_fr: 0,
      jr_en: 0,
      tr_fr: 1,
      tr_en: 1,
    },
    playerGameInfo: {
      team: 'france',
      voteCards: [
        {
          cannon: 0,
          fire: 2,
          water: 2,
          britain: 0,
          england: 0,
          skull: 0,
          wheel: 0,
        },
      ],
      eventCards: null,
      role: 'captain',
      availableActions: [
        'move',
        'view two event cards',
        'reveal one event card',
        'force another player to choose card',
        'call for an attack',
        'maroon any crew mate to tortuga',
      ],
    },
    lastAction: null,
    isOver: false,
    turn: { username: 'frost' },
    winner: null,
  },
  hasGame: true,
};
