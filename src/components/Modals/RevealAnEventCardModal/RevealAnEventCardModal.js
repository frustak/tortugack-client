import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import { doGameAction } from '../../../actions/gameActions/gameActions';
import EventCard from '../ViewTwoEventCardsModal/EventCard';

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

function ViewTwoEventCardsModal({ eventCardsDeckCount, doGameAction }) {
  const classes = useStyles();

  const onCardClick = () => {
    doGameAction();
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

export default connect(mapStateToProps, { doGameAction })(
  ViewTwoEventCardsModal
);
