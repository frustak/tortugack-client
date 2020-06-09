import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import EventCard from '../ViewTwoEventCardsModal/EventCard';
import { sendGameAction, handleModal } from '../../../../actions';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '150vh',
  },
  confirmButton: {
    width: '29vh',
    marginTop: '4px',
  },
});

function ViewTwoEventCardsModal({
  eventCardsDeckCount,
  sendGameAction,
  handleModal,
}) {
  const classes = useStyles();

  const onCardClick = index => {
    sendGameAction()
  };

  const eventCards = _.range(eventCardsDeckCount).map(cardIndex => {
    return <EventCard key={cardIndex} onClick={() => onCardClick(cardIndex)} />;
  });

  return <div className={classes.list}>{eventCards}</div>;
}

const mapStateToProps = state => {
  return {
    eventCardsDeckCount: state.game.data.gameStatus.eventCardsDeckCount,
  };
};

export default connect(mapStateToProps, { sendGameAction, handleModal })(
  ViewTwoEventCardsModal
);
