import React from 'react';
import styles from './VoteCards.module.css';

function VoteCards(props) {
  const cards = props.data.playerGameInfo.voteCards.map((card, index) => {
    return (
      <>
        <p>vote card number: {index + 1}</p>
        <p>cannon: {card.cannon}</p>
        <p>fire: {card.fire}</p>
        <p>water: {card.water}</p>
        <p>britain: {card.britain}</p>
        <p>skull: {card.skull}</p>
        <p>wheel: {card.wheel}</p>
      </>
    );
  });

  return <div className={styles.VoteCards}>{cards}</div>;
}

export default VoteCards;
