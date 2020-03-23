import React from 'react';
import styles from './VoteCards.module.css';
import _ from 'lodash';

function VoteCards(props) {
  const cards = props.data.playerGameInfo.voteCards.map((card, index) => {
    const details = [];
    _.forIn(card, (value, key) =>
      details.push(
        <p>
          {key}: {value}
        </p>
      )
    );

    return (
      <div className={styles.VoteCard}>
        <p>vote card number: {index + 1}</p>
        {details}
      </div>
    );
  });

  return <div className={styles.VoteCards}>{cards}</div>;
}

export default VoteCards;
