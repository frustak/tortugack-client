import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles({
  eventCard: {
    width: '29vh',
    textAlign: 'center',
    height: '400px',
    overflow: 'auto',
    padding: '8px',
    margin: '8px',
  },
  selectable: {
    cursor: 'pointer',
    transition: '0.2s ease',
    '&:hover': {
      backgroundColor: '#263238',
    },
  },
  checkIcon: {
    color: '#4CAF50',
    fontSize: 'xx-large',
  },
});

function EventCard({ onClick, hasCheckIcon, selectable }) {
  const classes = useStyles();

  const rootClasses = [classes.eventCard];
  if (selectable) rootClasses.push(classes.selectable);

  return (
    <Paper className={rootClasses.join(' ')} onClick={onClick}>
      {hasCheckIcon ? <CheckIcon className={classes.checkIcon} /> : null}
    </Paper>
  );
}

export default EventCard;
