import React from 'react';

import styles from './Cell.module.css';
import chestIcon from '../../../../assets/icons/chest.png';

function Cell({ color, position, player }) {
  const classes = [styles.cell, styles[color]].join(' ');

  if (color !== 'chest') {
    return (
      <div
        className={classes}
        style={{ left: position.x - 16, top: position.y - 16 }}
      >
        {player}
      </div>
    );
  } else {
    return (
      <div
        className={classes}
        style={{ left: position.x - 16, top: position.y - 16 }}
      >
        <img className={styles.image} src={chestIcon} alt="" />
        {player}
      </div>
    );
  }
}

export default Cell;
