import React from 'react';
import gameMap from '../../../assets/map.jpg';
import Cell from './Cell/Cell';
import _ from 'lodash';

const cells = {
  fd: {
    1: { x: 192, y: 174 },
    2: { x: 175, y: 232 },
    3: { x: 164, y: 285 },
    4: { x: 152, y: 342 },
    5: { x: 138, y: 399 },
    b: { x: 290, y: 287 },
    en: { x: 122, y: 279 },
    fr: { x: 200, y: 298 },
  },
  jr: {
    1: { x: 637, y: 166 },
    2: { x: 652, y: 226 },
    3: { x: 663, y: 278 },
    4: { x: 679, y: 336 },
    5: { x: 695, y: 399 },
    b: { x: 528, y: 293 },
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

function GameMap(props) {
  const output = [];

  _.forIn(props.data.players_position, (value, key) => {
    const [land, place] = value.split('_');
    const position = cells[land][place];
    output.push(<Cell player={key} position={position} key={key} color />);
  });

  _.forIn(props.data.chests_position, (value, key) => {
    const [land, place] = key.split('_');
    let position = cells[land][place];
    if (key === 'sg') position = cells.sg.nt; // FIXME: server-side naming :(
    output.push(
      <Cell player={value} position={position} key={key} color="chest" />
    );
  });

  return (
    <>
      <img src={gameMap} alt="game map" />
      {output}
    </>
  );
}

export default GameMap;

const t = {
  game_status: {
    players_position: { frostacktack: 'jr_1' },
    chests_position: {
      fd_fr: 0,
      fd_en: 0,
      sg: 4,
      jr_fr: 0,
      jr_en: 0,
      tr_fr: 1,
      tr_en: 1,
    },
    player_game_info: {
      team: 'france',
      vote_cards: null,
      event_cards: null,
      role: null,
    },
    last_action: null,
    is_over: false,
    turn: { username: 'frostacktack' },
    winner: null,
  },
  has_game: true,
};
