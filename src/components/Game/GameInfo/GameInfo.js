import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';

import { playSound } from '../../../helpers/audioHelper';
import britainFlag from '../../../assets/icons/britain-flag.png';
import franceFlag from '../../../assets/icons/france-flag.png';
import dutchFlag from '../../../assets/icons/dutch-flag.png';
import styles from './GameInfo.module.css';

function GameInfo({ data, username, players, turn }) {
  useEffect(() => {
    if (username === turn.username) playSound();
  }, [username, turn.username]);

  let hostColor;
  let userColor;

  const renderFlag = () => {
    switch (data.playerGameInfo.team) {
      case 'britain':
        return <img src={britainFlag} className={styles.img} alt="flag" />;
      case 'france':
        return <img src={franceFlag} className={styles.img} alt="flag" />;
      case 'dutch':
        return <img src={dutchFlag} className={styles.img} alt="flag" />;
      default:
        return null;
    }
  };

  const renderPlayers = () => {
    return players.map((player, index) => {
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
  };

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
          <span className={styles.row}>
            {data.playerGameInfo.team}
            {renderFlag()}
          </span>
          <span>{data.playerGameInfo.role || 'not defined'}</span>
          <span className={hostColor}>{data.turn.username}</span>
          <span className={styles.row}>{renderPlayers()}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.game.data.gameStatus,
    username: state.user.username,
    players: state.game.players,
    turn: state.game.data.gameStatus.turn,
  };
};

export default connect(mapStateToProps)(GameInfo);
