import _ from 'lodash';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EventCard from './EventCard';
import { sendGameAction, handleModal } from '../../../../actions';
import RevealedEventCardsModal from '../RevealedEventCardsModal/RevealedEventCardsModal';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    justifyContent: 'center',
    width: '150vh',
  },
  confirmButton: {
    width: '29vh',
    marginTop: '4px',
  },
});

function ViewTwoEventCardsModal({ eventCardsDeckCount, sendGameAction, handleModal }) {
  const classes = useStyles();
  const [selectedCards, setSelectedCards] = useState([]);

  const onCardClick = index => {
    if (selectedCards.some(item => item === index)) {
      const newCards = selectedCards.filter(removeIndex => index !== removeIndex);
      setSelectedCards(newCards);
      return;
    }

    if (selectedCards.length === 2) return;
    setSelectedCards([...selectedCards, index]);
  };

  const onConfirmClick = async () => {
    selectedCards.sort();
    await sendGameAction('view two event cards', {
      eventCardsIndexes: selectedCards,
    });
    handleModal(true, <RevealedEventCardsModal />);
  };

  const eventCards = _.range(eventCardsDeckCount).map(cardIndex => {
    const hasCheckIcon = selectedCards.some(index => cardIndex === index);
    return (
      <EventCard
        key={cardIndex}
        onClick={() => onCardClick(cardIndex)}
        hasCheckIcon={hasCheckIcon}
        selectable
      />
    );
  });

  return (
    <div className={classes.root}>
      <div className={classes.list}>{eventCards}</div>
      <Button
        className={classes.confirmButton}
        variant="contained"
        color="primary"
        disabled={selectedCards.length !== 2 && eventCardsDeckCount > 1}
        onClick={onConfirmClick}
      >
        CONFIRM
      </Button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    eventCardsDeckCount: state.game.data.gameStatus.eventCardsDeck.count,
  };
};

export default connect(mapStateToProps, { sendGameAction, handleModal })(ViewTwoEventCardsModal);
