import React from 'react';
import styles from './Cell.module.css';
import chestIcon from '../../../../assets/icons/chest.png';

function Cell(props) {
  const classes = [styles.Cell, styles[props.color]];

  if (props.color !== 'Chest') {
    return (
      <div
        className={classes.join(' ')}
        style={{ left: props.position.x - 16, top: props.position.y - 16 }}
      >
        {props.player}
      </div>
    );
  } else {
    return (
      <div
        className={classes.join(' ')}
        style={{ left: props.position.x - 16, top: props.position.y - 16 }}
      >
        <img className={styles.Image} src={chestIcon} alt="" />
        {props.player}
      </div>
    );
  }
}

export default Cell;
