import React from 'react';
import { connect } from 'react-redux';

import * as modalTypes from '../../../constants/modalTypes';
import { showModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';
import styles from './MyEventsModal.module.css';
import RevealedEventCard from '../TwoEventCardsModal/RevealedEventCard/RevealedEventCard';

function MyEventsModal({ cards, showModal, doGameAction }) {
  const onEventClick = async slug => {
    await doGameAction('SEE-EVENT-CARD-OPTIONS', {
      eventCardToSeeSlug: slug,
    });
    showModal(modalTypes.CARD_OPTION_MODAL);
  };

  const renderEvents = () => {
    return cards.map((card, index) => (
      <div className={styles.col} key={index}>
        <RevealedEventCard
          imageUrl={card.eventCard.imageUrl}
          title={card.eventCard.title}
          description={card.eventCard.description}
          click={() => onEventClick(card.eventCard.slug)}
          isDisabled={!card.canUse}
          showButton
        />
      </div>
    ));
  };

  return <div className={styles.myEventsModal}>{renderEvents()}</div>;
}

const mapStateToProps = state => {
  return {
    cards: state.game.data.gameStatus.playerGameInfo.eventCards,
  };
};

export default connect(mapStateToProps, {
  showModal,
  doGameAction,
})(MyEventsModal);
