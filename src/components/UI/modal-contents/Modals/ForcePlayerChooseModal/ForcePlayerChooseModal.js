import React from 'react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { handleModal, sendGameAction } from '../../../../../actions';
import ForceRevealCardModal from './ForceRevealCardModal';

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

function MaroonModal(props) {
  const classes = useStyles();

  const clickHandler = forcedPlayer => {
    props.handleModal(true, <ForceRevealCardModal forcedPlayer={forcedPlayer} />);
  };

  const output = _.keys(props.data.playersPosition)
    .filter(user => user !== props.currentUser)
    .map(player => (
      <Button
        key={player}
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
      <h3 className={classes.center}>Choose a player</h3>
      <div className={classes.row}>{output}</div>
    </Paper>
  );
}

const mapStateToProps = state => {
  return {
    currentUser: state.user.username,
    data: state.game.data.gameStatus,
  };
};

export default connect(mapStateToProps, {
  handleModal,
  sendGameAction,
})(MaroonModal);
