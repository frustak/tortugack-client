import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

import * as modalTypes from '../../../constants/modalTypes';
import { showModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';
import HiddenEventCard from '../TwoEventCardsModal/HiddenEventCard/HiddenEventCard';

const useStyles = makeStyles({
  row: {
    display: 'flex',
  },
});

function RevealCardModal({ eventCardsDeckCount, doGameAction, showModal }) {
  const classes = useStyles();

  const cardClickHandler = async eventCardIndex => {
    await doGameAction('reveal one event card', { eventCardIndex });
    showModal(modalTypes.LAST_REVEALED_CARD_MODAL);
  };

  const output = _.range(eventCardsDeckCount).map(index => (
    <HiddenEventCard key={index} index={index} cardClickHandler={cardClickHandler} />
  ));

  return <div className={classes.row}>{output}</div>;
}

const mapStateToProps = state => {
  return {
    eventCardsDeckCount: state.game.data.gameStatus.eventCardsDeck.count,
  };
};

export default connect(mapStateToProps, {
  doGameAction,
  showModal,
})(RevealCardModal);
