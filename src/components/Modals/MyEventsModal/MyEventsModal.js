import React from 'react';
import RevealedEventCard from '../TwoEventCardsModal/RevealedEventCard/RevealedEventCard';

function MyEventsModal({ cards, close, eventCardHandler }) {
  const clickHandler = slug => {
    eventCardHandler(slug);
    close();
  };

  const output = cards.map(card => (
    <RevealedEventCard
      imageUrl={card.eventCard.imageUrl}
      title={card.eventCard.title}
      description={card.eventCard.description}
      click={() => clickHandler(card.eventCard.slug)}
      isDisabled={!card.canUse}
    />
  ));
  return output;
}

export default MyEventsModal;
