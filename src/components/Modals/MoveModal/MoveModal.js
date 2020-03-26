import React from 'react';
import { Button, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
});

function MoveModal(props) {
  let moveWhere;
  switch (props.currentPosition) {
    case 'fd_1':
    case 'fd_2':
    case 'fd_3':
    case 'fd_4':
    case 'fd_5':
      moveWhere = {
        names: ['Flying Dutchman Boat'],
        keys: ['fd_b'],
      };
      break;
    case 'jr_1':
    case 'jr_2':
    case 'jr_3':
    case 'jr_4':
    case 'jr_5':
      moveWhere = {
        names: ['Jolly Roger Boat'],
        keys: ['jr_b'],
      };
      break;
    case 'tr_1':
    case 'tr_2':
    case 'tr_3':
    case 'tr_4':
    case 'tr_5':
    case 'tr_6':
    case 'tr_7':
    case 'tr_8':
    case 'tr_9':
      moveWhere = {
        names: ['Flying Dutchman Boat', 'Jolly Roger Boat'],
        keys: ['fd_b', 'jr_b'],
      };
      break;
    case 'fd_b':
      moveWhere = {
        names: ['Flying Dutchman Ship', 'Tortuga Island'],
        keys: ['fd', 'tr'],
      };
      break;
    case 'jr_b':
      moveWhere = {
        names: ['Jolly Roger Ship', 'Tortuga Island'],
        keys: ['jr', 'tr'],
      };
      break;
    default:
  }

  const sendMove = where => {
    props.sendAction('move', { moveWhere: where });
    props.close();
  };

  const classes = useStyles();

  const output = moveWhere.names.map((place, index) => (
    <Button
      className={classes.btn}
      variant="contained"
      color="primary"
      onClick={() => sendMove(moveWhere.keys[index])}
    >
      {place}
    </Button>
  ));

  return <Paper className={classes.paper}>{output}</Paper>;
}

export default MoveModal;
