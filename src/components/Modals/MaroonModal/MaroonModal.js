import React from 'react';
import _ from 'lodash';
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
  row: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

function MaroonModal({ data, username }) {
  const classes = useStyles();
  const currentShip = data.playersPosition[username].slice(0, 2);

  const onOptionClick = crewToMaroon => {
    doGameAction('maroon any crew mate to tortuga', { crewToMaroon });
    hideModal();
  };

  const renderOptions = () => {
    const players = [];
    _.forIn(data.playersPosition, (value, key) => {
      if (value.startsWith(currentShip) && key !== username) players.push(key);
    });
    return players.map((player, index) => (
      <Button
        key={index}
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
      <p>Choose a player to maroon</p>
      <div className={classes.row}>{renderOptions()}</div>
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
  hideModal,
  doGameAction,
})(MaroonModal);
