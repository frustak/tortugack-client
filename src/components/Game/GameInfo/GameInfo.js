import React from 'react';
import _ from 'lodash';
import styles from './GameInfo.module.css';
import { connect } from 'react-redux';

function GameInfo({ data, username }) {
  let hostColor;
  let userColor;

  const players = _.keys(data.playersPosition).map((player, index) => {
    const style = styles[`Player_${index + 1}`];
    let output = player;
    if (data.turn.username === player) {
      hostColor = style;
      output = <strong>{player}</strong>;
    }
    if (username === player) userColor = style;
    let divider = ',';
    if (index === _.keys(data.playersPosition).length - 1) divider = '';
    return (
      <span className={style} key={index}>
        {output}
        {divider}&nbsp;
      </span>
    );
  });

  return (
    <div className={styles.infoPaper}>
      <div className={styles.GameInfo}>
        <div className={styles.col}>
          <span>Name</span>
          <span>Team </span>
          <span>Role </span>
          <span>Turn</span>
          <span>Players</span>
        </div>
        <div className={styles.col}>
          <span className={userColor}>{username}</span>
          <span>{data.playerGameInfo.team}</span>
          <span>{data.playerGameInfo.role ? data.playerGameInfo.role : 'not defined'}</span>
          <span className={hostColor}>{data.turn.username}</span>
          <span className={styles.row}>{players}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.game.data.gameStatus,
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(GameInfo);
