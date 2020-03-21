import React from 'react';
import _ from 'lodash';
import styles from './GameInfo.module.css';

function GameInfo(props) {
  let hostColor;
  let userColor;

  const players = _.keys(props.data.playersPosition).map((player, index) => {
    const style = styles[`Player_${index + 1}`];
    let output = player;
    if (props.data.turn.username === player) {
      hostColor = style;
      output = <strong>{player}</strong>;
    }
    if (props.username === player) userColor = style;
    return (
      <p className={style} key={index}>
        {output}
      </p>
    );
  });

  return (
    <div className={styles.GameInfo}>
      <p>
        your name: <span className={userColor}>{props.username}</span>
      </p>
      <p>your team: {props.data.playerGameInfo.team}</p>
      <p>your role: {props.data.playerGameInfo.role}</p>
      <p>
        turn: <span className={hostColor}>{props.data.turn.username}</span>
      </p>
      <p>players: </p>
      {players}
    </div>
  );
}

export default GameInfo;
