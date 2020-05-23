import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import HiddenEventCard from './HiddenEventCard/HiddenEventCard';
import { Button } from '@material-ui/core';
import RevealedEventCard from './RevealedEventCard/RevealedEventCard';
import UnRevealedCard from './UnRevealedCard/UnRevealedCard';

const useStyles = makeStyles({
  row: {
    display: 'flex',
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  placeHolder: {
    height: 36,
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
    props.data.gameStatus.eventCardsDeckCount
  ).map(index => (
    <HiddenEventCard
      index={index}
      cardClickHandler={cardClickHandler}
      selected={eventCardsIndexes.includes(index)}
      key={index}
    />
  ));

  function confirmHandler() {
    eventCardsIndexes.sort();
    props.sendAction('view two event cards', { eventCardsIndexes });
    setShowDetails(true);
  }

  if (showDetails) {
    const cards = props.data.gameStatus.playerGameInfo.seenEventCards;
    const revealedCards = new Array(5);
    revealedCards.fill(<UnRevealedCard />);
    _.forIn(cards, (value, key) => {
      revealedCards[key] = (
        <RevealedEventCard
          title={value.title}
          description={value.description}
          imageUrl={value.imageUrl}
        />
      );
    });
    return (
      <div className={classes.col}>
        <div className={classes.row}>{revealedCards}</div>
        <div className={classes.placeHolder}></div>
      </div>
    );
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
