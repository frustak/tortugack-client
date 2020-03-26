import React from 'react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

function MaroonModal(props) {
  const classes = useStyles();
  const currentShip = props.data.playersPosition[props.username].slice(0, 2);
  const players = [];

  _.forIn(props.data.playersPosition, (value, key) => {
    if (value.startsWith(currentShip) && key !== props.username)
      players.push(key);
  });

  const clickHandler = crewToMaroon => {
    props.sendAction('maroon any crew mate to tortuga', { crewToMaroon });
    props.close();
  };

  const output = players.map(player => (
    <Button
      className={classes.btn}
      variant="contained"
      color="primary"
      onClick={() => clickHandler(player)}
    >
      {player}
    </Button>
  ));

  return (
    <Paper className={classes.paper}>
      <p>Choose a player to maroon</p>
      <div className={classes.row}>{output}</div>
    </Paper>
  );
}

export default MaroonModal;

const t = {
  gameId: '026EC4',
  gameStatus: {
    playersPosition: { Frost: 'jr_1', trust: 'fd_1' },
    chestsPosition: {
      fd_fr: 0,
      fd_en: 3,
      sg_nt: 2,
      jr_fr: 1,
      jr_en: 0,
      tr_fr: 1,
      tr_en: 1,
    },
    playerGameInfo: {
      team: 'dutch',
      voteCards: [
        {
          cannon: 0,
          fire: 2,
          water: 28,
          britain: 3,
          france: 3,
          skull: 1,
          wheel: 3,
        },
        {
          cannon: 0,
          fire: 1,
          water: 24,
          britain: 2,
          france: 1,
          skull: 2,
          wheel: 4,
        },
        {
          cannon: 0,
          fire: 2,
          water: 67,
          britain: 2,
          france: 3,
          skull: 1,
          wheel: 2,
        },
      ],
      eventCards: null,
      role: null,
      availableActions: [
        'move',
        'view two event cards',
        'reveal one event card',
        'force another player to choose card',
        'call for a mutiny',
        'call for an attack',
        'maroon any crew mate to tortuga',
        'move treasure',
      ],
      chests: 0,
    },
    lastAction: {
      actionType: 'call for an attack',
      actionData: {
        whichCaptain: { username: 'trust' },
        state: 'success',
        fromOtherShip: false,
        participatingPlayers: [],
      },
    },
    isOver: false,
    turn: { username: 'Frost' },
    winner: null,
  },
  hasGame: true,
};
