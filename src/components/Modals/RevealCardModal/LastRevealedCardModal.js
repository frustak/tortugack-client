import React from 'react';
import { connect } from 'react-redux';

import RevealedEventCard from '../RevealedEventCardsModal/RevealedEventCard';

function LastRevealedCardModal({ data }) {
  return (
    <div>
      <RevealedEventCard data={data} />
    </div>
  );
}

const mapStateToProps = state => {
  return { data: state.game.data.gameStatus.lastAction.actionData.eventCard };
};

export default connect(mapStateToProps)(LastRevealedCardModal);
