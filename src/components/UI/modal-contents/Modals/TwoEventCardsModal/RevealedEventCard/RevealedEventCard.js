import React from 'react';
import { Card, makeStyles, Button } from '@material-ui/core';

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
      {props.showButton ? (
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

export default RevealedEventCard;
