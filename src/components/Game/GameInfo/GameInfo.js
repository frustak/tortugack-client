import React from 'react';
import _ from 'lodash';
import styles from './GameInfo.module.css';

function GameInfo(props) {
  let hostColor;

  const players = _.keys(props.data.players_position).map((player, index) => {
    const style = styles[`Player_${index + 1}`];
    if (props.data.turn.username === player) {
      hostColor = style;
      return (
        <p className={style}>
          <strong>{player}</strong>
        </p>
      );
    }
    return <p className={style}>{player}</p>;
  });

  return (
    <>
      <p className={hostColor}>turn: {props.data.turn.username}</p>
      <p>team: {props.data.player_game_info.team}</p>
      {players}
    </>
  );
}

export default GameInfo;
