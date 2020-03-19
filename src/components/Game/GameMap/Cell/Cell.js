import React from 'react';
import styles from './Cell.module.css';

function Cell(props) {
  const color = `Player_${props.color}`;
  const classes = [styles.Cell, styles[color]];
  
  return (
    <div
      className={classes.join(' ')}
      style={{ left: props.position.x - 18, top: props.position.y - 18 }}
      title={props.player}
    />
  );
}

export default Cell;
