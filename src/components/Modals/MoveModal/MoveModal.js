import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { hideModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
});

function MoveModal({ currentPosition, doGameAction, hideModal }) {
  const classes = useStyles();

  let moveWhere;
  switch (currentPosition) {
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
    doGameAction('move', { moveWhere: where });
    hideModal();
  };

  const renderOptions = () => {
    return moveWhere.names.map((place, index) => (
      <Button
        key={place}
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => sendMove(moveWhere.keys[index])}
      >
        {place}
      </Button>
    ));
  };

  return <Paper className={classes.paper}>{renderOptions()}</Paper>;
}

const mapStateToProps = state => {
  const username = state.user.username;
  return {
    currentPosition: state.game.data.gameStatus.playersPosition[username],
  };
};

export default connect(mapStateToProps, {
  hideModal,
  doGameAction,
})(MoveModal);
