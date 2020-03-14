import React, { useState } from 'react';
import styles from './Cell.module.css';

function Cell(props) {
  const positionStyle = {
    left: props.position.x - 20,
    top: props.position.y - 20,
  };
  const [classes, setClasses] = useState([styles.Cell]);

  const clickHandler = () =>
    classes.some(cls => cls === styles.red)
      ? setClasses([styles.Cell])
      : setClasses([styles.Cell, styles.red]);

  return (
    <div
      className={classes.join(' ')}
      style={positionStyle}
      onClick={clickHandler}
    ></div>
  );
}

export default Cell;
