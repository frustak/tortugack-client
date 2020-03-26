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
    let divider = ',';
    if (index === _.keys(props.data.playersPosition).length - 1) divider = '';
    return (
      <span className={style} key={index}>
        {output}
        {divider}&nbsp;
      </span>
    );
  });

  return (
    <div className={styles.GameInfo}>
      <div className={styles.col}>
        <span>Name</span>
        <span>Team </span>
        <span>Role </span>
        <span>Turn</span>
        <span>Players</span>
      </div>
      <div className={styles.col}>
        <span className={userColor}>{props.username}</span>
        <span>{props.data.playerGameInfo.team}</span>
        <span>
          {props.data.playerGameInfo.role
            ? props.data.playerGameInfo.role
            : 'not defined'}
        </span>
        <span className={hostColor}>{props.data.turn.username}</span>
        <span className={styles.row}>{players}</span>
      </div>
    </div>
  );
}

export default GameInfo;
