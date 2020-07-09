import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import HiddenEventCard from './HiddenEventCard/HiddenEventCard';
import { Button } from '@material-ui/core';
import RevealedEventCard from './RevealedEventCard/RevealedEventCard';
import UnRevealedCard from './UnRevealedCard/UnRevealedCard';
import { connect } from 'react-redux';
import { sendGameAction } from '../../../../../actions';

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
  title: {
    fontSize: 'large',
  },
  description: {
    fontSize: 'medium',
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
    props.sendGameAction('view two event cards', { eventCardsIndexes });
    setShowDetails(true);
  }

  if (showDetails) {
    const cards = props.data.gameStatus.playerGameInfo.seenEventCards;
    let revealedCards = new Array(props.data.gameStatus.eventCardsDeckCount);
    revealedCards.fill(0);
    revealedCards = revealedCards.map((card, index) => (
      <UnRevealedCard key={index} />
    ));
    _.forIn(cards, (value, key) => {
      revealedCards[key] = (
        <RevealedEventCard
          title={value.title}
          description={value.description}
          imageUrl={value.imageUrl}
          key={key}
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

const mapStateToProps = state => {
  return { data: state.game.data };
};

export default connect(mapStateToProps, { sendGameAction })(TwoEventCardsModal);
