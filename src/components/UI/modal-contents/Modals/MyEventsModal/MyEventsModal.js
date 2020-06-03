import React from 'react';
import RevealedEventCard from '../TwoEventCardsModal/RevealedEventCard/RevealedEventCard';
import { connect } from 'react-redux';
import { handleModal, sendGameAction } from '../../../../../actions';
import styles from './MyEventsModal.module.css';
import CardOptionModal from '../CardOptionModal/CardOptionModal';

function MyEventsModal({ cards, handleModal, sendGameAction }) {
  const clickHandler = async slug => {
    await sendGameAction('SEE-EVENT-CARD-OPTIONS', {
      eventCardToSeeSlug: slug,
    });
    handleModal(true, <CardOptionModal />);
  };

  const output = cards.map((card, index) => (
    <div className={styles.col} key={index}>
      <RevealedEventCard
        imageUrl={card.eventCard.imageUrl}
        title={card.eventCard.title}
        description={card.eventCard.description}
        click={() => clickHandler(card.eventCard.slug)}
        isDisabled={!card.canUse}
        showButton
      />
    </div>
  ));
  return <div className={styles.MyEventsModal}>{output}</div>;
}

const mapStateToProps = state => {
  return { cards: state.game.data.gameStatus.playerGameInfo.eventCards };
};

export default connect(mapStateToProps, {
  handleModal,
  sendGameAction,
})(MyEventsModal);
