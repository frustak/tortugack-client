import React, { useState } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import * as modalTypes from '../../../constants/modalTypes';
import { showModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';
import EventCard from './EventCard';

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

function ViewTwoEventCardsModal({ eventCardsDeckCount, doGameAction, showModal }) {
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
    await doGameAction('view two event cards', {
      eventCardsIndexes: selectedCards,
    });
    showModal(modalTypes.REVEALED_EVENT_CARDS_MODAL);
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

export default connect(mapStateToProps, { doGameAction, showModal })(ViewTwoEventCardsModal);
