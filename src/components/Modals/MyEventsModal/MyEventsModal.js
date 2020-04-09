import React from 'react';
import RevealedEventCard from '../TwoEventCardsModal/RevealedEventCard/RevealedEventCard';

function MyEventsModal({ cards, close, eventCardHandler }) {
  const clickHandler= (slug) => {
    eventCardHandler(slug);
    close();
  }
  
  const output = cards.map(card => (
    <RevealedEventCard
      imageUrl={card.imageUrl}
      title={card.title}
      description={card.description}
      click={() => clickHandler(card.slug)}
    />
  ));
  return output;
}

export default MyEventsModal;
