import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    width: 300,
    height: 500,
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
  image: {},
});

function RevealedEventCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <img src={props.imageUrl} alt={props.title} className={classes.image} />
      <p className={classes.small}>{props.title}</p>
      <p className={classes.smallest}>{props.description}</p>
    </Card>
  );
}

export default RevealedEventCard;
