import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import * as modalTypes from '../../../constants/modalTypes';
import { showModal } from '../../../actions/modalActions/modalActions';

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
  center: {
    textAlign: 'center',
  },
});

function MaroonModal({ data, currentUser, showModal }) {
  const classes = useStyles();

  const onOptionClick = forcedPlayer => {
    showModal(modalTypes.FORCE_REVEAL_CARD_MODAL, { forcedPlayer });
  };

  const renderOptions = () => {
    return _.keys(data.playersPosition)
      .filter(user => user !== currentUser)
      .map(player => (
        <Button
          key={player}
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => onOptionClick(player)}
        >
          {player}
        </Button>
      ));
  };

  return (
    <Paper className={classes.paper}>
      <h3 className={classes.center}>Choose a player</h3>
      <div className={classes.row}>{renderOptions()}</div>
    </Paper>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.username,
    data: state.game.data.gameStatus,
  };
};

export default connect(mapStateToProps, { showModal })(MaroonModal);
