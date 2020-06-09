import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  eventCard: {
    width: '29vh',
    textAlign: 'center',
    height: '400px',
    overflow: 'auto',
    padding: '8px',
    margin: '8px',
  },
});

function RevealedEventCard({ data }) {
  const classes = useStyles();

  return (
    <Paper className={classes.eventCard}>
      <img src={data.imageUrl} alt={data.title} />
      <h4>{data.title}</h4>
      <h5>{data.description}</h5>
    </Paper>
  );
}

export default RevealedEventCard;
