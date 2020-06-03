import React from 'react';
import gameMap from '../../../assets/map.jpg';
import Cell from './Cell/Cell';
import _ from 'lodash';
import { connect } from 'react-redux';

const cells = {
  fd: {
    1: { x: 193, y: 175 },
    2: { x: 177, y: 234 },
    3: { x: 164, y: 285 },
    4: { x: 152, y: 342 },
    5: { x: 138, y: 399 },
    b: { x: 290, y: 287 },
    en: { x: 123, y: 279 },
    fr: { x: 200, y: 298 },
  },
  jr: {
    1: { x: 638, y: 169 },
    2: { x: 652, y: 227 },
    3: { x: 664, y: 279 },
    4: { x: 679, y: 336 },
    5: { x: 695, y: 399 },
    b: { x: 530, y: 295 },
    en: { x: 624, y: 294 },
    fr: { x: 704, y: 276 },
  },
  tr: {
    1: { x: 365, y: 101 },
    2: { x: 411, y: 94 },
    3: { x: 442, y: 115 },
    4: { x: 460, y: 152 },
    5: { x: 432, y: 179 },
    6: { x: 392, y: 191 },
    7: { x: 368, y: 223 },
    8: { x: 377, y: 263 },
    9: { x: 423, y: 276 },
    en: { x: 368, y: 150 },
    fr: { x: 461, y: 218 },
  },
  sg: { nt: { x: 468, y: 414 } },
};

function GameMap({ playersPosition, chestsPosition }) {
  const output = [];

  let i = 1;
  _.forIn(playersPosition, (value, key) => {
    const [land, place] = value.split('_');
    const position = cells[land][place];
    output.push(
      <Cell player={key} position={position} key={key} color={`Player_${i}`} />
    );
    i++;
  });

  _.forIn(chestsPosition, (value, key) => {
    const [land, place] = key.split('_');
    let position = cells[land][place];
    output.push(
      <Cell player={value} position={position} key={key} color="Chest" />
    );
  });

  return (
    <>
      <img src={gameMap} alt="game map" />
      {output}
    </>
  );
}

const mapStateToProps = state => {
  return {
    playersPosition: state.game.data.gameStatus.playersPosition,
    chestsPosition: state.game.data.gameStatus.chestsPosition,
  };
};

export default connect(mapStateToProps)(GameMap);
