import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EventCard from '../ViewTwoEventCardsModal/EventCard';
import RevealedEventCard from './RevealedEventCard';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '150vh',
  },
});

function ViewTwoEventCardsModal({ eventCardsDeckCount, seenEventCards }) {
  const classes = useStyles();

  const eventCards = _.range(eventCardsDeckCount).map(cardIndex => <EventCard key={cardIndex} />);

  _.forIn(seenEventCards, (value, key) => {
    eventCards[key] = <RevealedEventCard key={key} data={value} />;
  });

  return <div className={classes.list}>{eventCards}</div>;
}

const mapStateToProps = state => {
  return {
    eventCardsDeckCount: state.game.data.gameStatus.eventCardsDeck.count,
    seenEventCards: state.game.data.gameStatus.playerGameInfo.seenEventCards,
  };
};

export default connect(mapStateToProps)(ViewTwoEventCardsModal);
