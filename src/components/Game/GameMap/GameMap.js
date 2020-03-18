import React from 'react';
import styles from './GameMap.module.css';

function GameMap(props) {
  const legend = {
    0: 'sea',
    1: 'ship',
    2: 'land',
    3: 'chest-holder',
  };

  const gameMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 5, 2, 2, 2, 6, 6, 2, 0, 0, 1, 0, 0],
    [0, 0, 4, 0, 0, 0, 2, 5, 2, 6, 6, 6, 6, 0, 0, 4, 0, 0],
    [0, 6, 1, 6, 0, 0, 2, 2, 5, 2, 6, 6, 2, 0, 6, 1, 6, 0],
    [0, 6, 4, 6, 0, 0, 0, 2, 2, 5, 2, 2, 0, 0, 6, 4, 6, 0],
    [0, 6, 1, 6, 0, 0, 0, 2, 5, 2, 0, 0, 4, 0, 6, 1, 6, 0],
    [0, 6, 4, 6, 0, 0, 0, 0, 2, 5, 2, 0, 0, 0, 6, 4, 6, 0],
    [0, 6, 1, 6, 0, 4, 0, 0, 0, 2, 5, 2, 0, 0, 6, 1, 6, 0],
    [0, 6, 4, 6, 0, 0, 0, 5, 2, 5, 2, 2, 0, 0, 6, 4, 6, 0],
    [0, 6, 1, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 1, 6, 0],
    [0, 6, 4, 6, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 6, 4, 6, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 1, 6, 6, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  const output = gameMap.map((row, rowIndex) => {
    const cells = row.map((cell, cellIndex) => {
      let child = null;
      if (cell === 4 || cell === 5) {
        child = <div className={styles.place}></div>;
        cell -= 3;
      }
      if (cell === 6) {
        child = <div className={styles.chestPlace}></div>;
        cell -= 3;
      }
      const classes = [styles.cell, styles[legend[cell]]].join(' ');
      return (
        <div className={classes} key={cellIndex}>
          {child}
        </div>
      );
    });

    return (
      <div className={styles.row} key={rowIndex}>
        {cells}
      </div>
    );
  });

  return <>{output}</>;
}

export default GameMap;
