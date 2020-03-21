import React from 'react';
import styles from './GameAction.module.css';

function GameAction(props) {
  let output = null;

  if (props.data.turn.username === props.username) {
    output = props.data.playerGameInfo.availableActions.map((action, index) => (
      <button onClick={() => props.sendAction(action)} key={index}>
        {action}
      </button>
    ));
  }

  const vote = () => {
    const voteIndex = prompt('gimme vote');
    const action = 'vote';
    const payload = { voteCardIndex: +voteIndex };
    props.sendAction(action, payload);
  };

  const canVote = props.data.lastAction?.actionData.participatingPlayers.some(
    player => props.username === player
  );

  if (canVote) output = <button onClick={vote}>vote</button>;
  return <div className={styles.GameAction}>{output}</div>;
}

export default GameAction;