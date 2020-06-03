import React from 'react';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { handleModal, sendGameAction } from '../../../../../actions';

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
    props.sendGameAction('maroon any crew mate to tortuga', { crewToMaroon });
    props.handleModal(false);
  };

  const output = players.map((player, index) => (
    <Button
      key={index}
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

const mapStateToProps = state => {
  return {
    username: state.user.username,
    data: state.game.data.gameStatus,
  };
};

export default connect(mapStateToProps, {
  handleModal,
  sendGameAction,
})(MaroonModal);
