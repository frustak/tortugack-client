import React from 'react';
import styles from './Cell.module.css';

function Cell(props) {
  return (
    <div
      className={styles.Cell}
      style={{ left: props.position.x - 18, top: props.position.y - 18 }}
      title={props.player}
    />
  );
}

export default Cell;
