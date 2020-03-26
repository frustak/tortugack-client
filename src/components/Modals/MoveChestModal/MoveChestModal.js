import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import franceIcon from '../../../assets/icons/france-flag.png';
import britainIcon from '../../../assets/icons/britain-flag.png';

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
  image: {
    width: '32px',
    height: '32px',
    marginLeft: '8px',
  },
});

function MoveChestModal(props) {
  const classes = useStyles();
  const buttons = [];

  if (props.data.playersPosition[props.username].startsWith('jr')) {
    if (props.data.chestsPosition.jr_en > 0) {
      if (!buttons.some(button => button === 'BRITAIN'))
        buttons.push('BRITAIN');
    }
    if (props.data.chestsPosition.jr_fr > 0) {
      if (!buttons.some(button => button === 'FRANCE')) buttons.push('FRANCE');
    }
  } else {
    if (props.data.chestsPosition.fd_en > 0) {
      if (!buttons.some(button => button === 'BRITAIN'))
        buttons.push('BRITAIN');
    }
    if (props.data.chestsPosition.fd_fr > 0) {
      if (!buttons.some(button => button === 'FRANCE')) buttons.push('FRANCE');
    }
  }

  const output = buttons.map(button => (
    <Button
      className={classes.btn}
      variant="contained"
      color="primary"
      onClick={() => {
        props.sendAction('move treasure', { fromHold: button });
        props.close();
      }}
    >
      {button}
      <img
        src={button === 'BRITAIN' ? britainIcon : franceIcon}
        alt=""
        className={classes.image}
      />
    </Button>
  ));

  return (
    <Paper className={classes.paper}>
      <p>Which team do you want to take a treasure chest from?</p>
      <div className={classes.row}>{output}</div>
    </Paper>
  );
}

export default MoveChestModal;

const t = {
  gameId: '101E8F',
  gameStatus: {
    playersPosition: { trust: 'jr_b', Frost: 'fd_1' },
    chestsPosition: {
      fd_fr: 1,
      fd_en: 1,
      sg_nt: 2,
      jr_fr: 1,
      jr_en: 1,
      tr_fr: 1,
      tr_en: 1,
    },
    playerGameInfo: {
      team: 'dutch',
      voteCards: [
        {
          cannon: 0,
          fire: 2,
          water: 46,
          britain: 1,
          france: 2,
          skull: 1,
          wheel: 5,
        },
        {
          cannon: 0,
          fire: 2,
          water: 3,
          britain: 4,
          france: 2,
          skull: 2,
          wheel: 3,
        },
      ],
      eventCards: null,
      role: null,
      availableActions: [],
      chests: 0,
    },
    lastAction: {
      actionType: 'move treasure',
      actionData: { cabinBoy: 'Frost', fromHold: 'FRANCE', toHold: 'BRITAIN' },
    },
    isOver: false,
    turn: { username: 'trust' },
    winner: null,
  },
  hasGame: true,
};
