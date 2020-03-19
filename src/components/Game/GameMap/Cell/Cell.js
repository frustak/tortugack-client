import React from 'react';
import styles from './Cell.module.css';

function Cell(props) {
  const classes = [styles.Cell, styles[props.color]];
  
  return (
    <div
      className={classes.join(' ')}
      style={{ left: props.position.x - 16, top: props.position.y - 16 }}
      title={props.player}
    />
  );
}

export default Cell;
