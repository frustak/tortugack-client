import React from 'react';
import styles from './Cells.module.css';
import Cell from './Cell/Cell';

function Cells(props) {
  const CellPositions = [
    { x: 184, y: 166 },
    { x: 170, y: 225 },
    { x: 155, y: 276 },
    { x: 145, y: 334 },
    { x: 130, y: 390 },
    { x: 280, y: 275 },
    { x: 630, y: 160 },
    { x: 642, y: 217 },
    { x: 660, y: 270 },
    { x: 670, y: 329 },
    { x: 689, y: 390 },
    { x: 520, y: 285 },
    { x: 358, y: 91 },
    { x: 401, y: 85 },
    { x: 435, y: 107 },
    { x: 455, y: 145 },
    { x: 425, y: 173 },
    { x: 385, y: 180 },
    { x: 360, y: 215 },
    { x: 370, y: 255 },
    { x: 415, y: 266 },
  ];

  const renderedCells = CellPositions.map((cellPos, index) => (
    <Cell position={cellPos} key={index} />
  ));

  return <div className={styles.Cells}>{renderedCells}</div>;
}

export default Cells;
