import React from 'react';
import { Card, makeStyles, Button } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  card: {
    width: 250,
    height: 450,
    margin: 8,
    padding: 8,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
  },
  small: {
    fontSize: 'large',
  },
  smallest: {
    fontSize: 'medium',
  },
  btn: {
    marginLeft: 8,
    marginRight: 8,
    width: 250,
  },
});

function RevealedEventCard(props) {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <img src={props.imageUrl} alt={props.title} className={classes.image} />
        <p className={classes.small}>{props.title}</p>
        <p className={classes.smallest}>{props.description}</p>
      </Card>
      {props.showButton && props.isPlayerTurn && props.isNotInAction ? (
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={props.click}
          disabled={props.isDisabled}
        >
          use
        </Button>
      ) : null}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isPlayerTurn:
      state.game.data.gameStatus.turn.username === state.user.username,
    isNotInAction:
      state.game.data.gameStatus.lastAction.actionType !==
      'reveal one event card',
  };
};

export default connect(mapStateToProps)(RevealedEventCard);
