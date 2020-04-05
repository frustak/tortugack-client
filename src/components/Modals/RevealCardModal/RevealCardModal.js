import React from 'react';
import _ from 'lodash';
import HiddenEventCard from '../TwoEventCardsModal/HiddenEventCard/HiddenEventCard';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  row: {
    display: 'flex',
  },
});

function RevealCardModal({ eventCardsDeckCount, sendAction, close }) {
  const classes = useStyles();
  
  const cardClickHandler = eventCardIndex => {
    sendAction('reveal one event card', { eventCardIndex });
    close();
  };

  const output = _.range(eventCardsDeckCount).map(index => (
    <HiddenEventCard
      key={index}
      index={index}
      cardClickHandler={cardClickHandler}
    />
  ));

  return <div className={classes.row}>{output}</div>;
}

export default RevealCardModal;
