import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';
import _ from 'lodash';
import britainFlag from '../../../../../assets/icons/britain-flag.png';
import franceFlag from '../../../../../assets/icons/france-flag.png';
import dutchFlag from '../../../../../assets/icons/dutch-flag.png';
import { connect } from 'react-redux';
import { leaveGame } from '../../../../../actions';

const useStyles = makeStyles({
  container: {
    backdropFilter: 'blur(5px)',
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerStyle: {
    fontWeight: 'bolder',
  },
  iconStyle: {
    width: 32,
    height: 32,
    marginLeft: 8,
  },
  loserStyle: {},
  paperStyle: {
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    width: 400,
  },
  btn: {
    marginTop: 8,
  },
  winnerContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

function WinnerModal({ winner, leaveGame }) {
  const classes = useStyles();
  const { winnerTeam, playersTeams } = winner;
  let winnerPlayers = [];
  let loserPlayers = [];

  _.forIn(playersTeams, (value, key) => {
    if (value === winnerTeam) winnerPlayers.push(key);
    else loserPlayers.push(key);
  });

  const winnersList = winnerPlayers.map(player => (
    <p className={classes.winnerStyle}>{player}, </p>
  ));

  const losersList = loserPlayers.map(player => (
    <p className={classes.loserStyle}>{player}, </p>
  ));

  const flag =
    winner === 'britain'
      ? britainFlag
      : winner === 'france'
      ? franceFlag
      : dutchFlag;

  return (
    <div className={classes.container}>
      <Paper className={classes.paperStyle}>
        <h2>Game Has Ended!</h2>
        <p className={classes.winnerContainer}>
          The Winner Team is: {winnerTeam}{' '}
          <img src={flag} alt="" className={classes.iconStyle} />
        </p>{' '}
        <p>Winners: {winnersList}</p>
        <p>Losers: {losersList}</p>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={leaveGame}
        >
          Back to Menu
        </Button>
      </Paper>
    </div>
  );
}

const mapStateToProps = state => {
  return { winner: state.game.data.gameStatus.winner };
};

export default connect(mapStateToProps, { leaveGame })(WinnerModal);
