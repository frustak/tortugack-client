import React from 'react';
import _ from 'lodash';
import HiddenEventCard from '../TwoEventCardsModal/HiddenEventCard/HiddenEventCard';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { sendGameAction, showLastRevealedCard } from '../../../../../actions';

const useStyles = makeStyles({
  row: {
    display: 'flex',
  },
});

function RevealCardModal({
  eventCardsDeckCount,
  sendGameAction,
  showLastRevealedCard,
}) {
  const classes = useStyles();

  const cardClickHandler = async eventCardIndex => {
    await sendGameAction('reveal one event card', { eventCardIndex });
    showLastRevealedCard();
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

const mapStateToProps = state => {
  return {
    eventCardsDeckCount: state.game.data.gameStatus.eventCardsDeckCount,
  };
};

export default connect(mapStateToProps, {
  sendGameAction,
  showLastRevealedCard,
})(RevealCardModal);
