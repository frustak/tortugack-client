import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: 290,
    height: 500,
    margin: 8,
  },
});

function UnRevealedCard(props) {
  const classes = useStyles();

  return <Card className={classes.card}></Card>;
}

export default UnRevealedCard;
