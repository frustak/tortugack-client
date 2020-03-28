import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import HiddenEventCard from './HiddenEventCard/HiddenEventCard';
import { Button, Paper } from '@material-ui/core';
import RevealedEventCard from './RevealedEventCard/RevealedEventCard';

const useStyles = makeStyles({
  row: {
    display: 'flex',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function TwoEventCardsModal(props) {
  const classes = useStyles();
  const [eventCardsIndexes, setEventCardsIndex] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  function cardClickHandler(index, isSelected) {
    if (isSelected) {
      const newCards = eventCardsIndexes.filter(
        cardIndex => cardIndex !== index
      );
      setEventCardsIndex(newCards);
      return;
    }
    if (eventCardsIndexes.length >= 2) return;
    setEventCardsIndex([...eventCardsIndexes, index]);
  }

  const eventCard = _.range(
    1,
    props.data.gameStatus.eventCardsDeckCount + 1
  ).map(index => (
    <HiddenEventCard
      index={index}
      cardClickHandler={cardClickHandler}
      selected={eventCardsIndexes.includes(index)}
    />
  ));

  function confirmHandler() {
    props.sendAction('view two event cards', { eventCardsIndexes });
    setShowDetails(true);
  }

  if (showDetails) {
    const revealedCards = props.data.gameStatus.playerGameInfo.seenEventCards.map(
      card => (
        <RevealedEventCard
          title={card.title}
          description={card.description}
          imageUrl={card.imageUrl}
        />
      )
    );
    return <div className={classes.row}>{revealedCards}</div>;
  } else {
    return (
      <div className={classes.col}>
        <div className={classes.row}>{eventCard}</div>
        <Button
          variant="contained"
          color="primary"
          onClick={confirmHandler}
          disabled={eventCardsIndexes.length !== 2}
        >
          confirm
        </Button>
      </div>
    );
  }
}

export default TwoEventCardsModal;
