import React from 'react';
import styles from './GameAction.module.css';

function GameAction(props) {
  let output = null;

  const vote = () => {
    const voteIndex = prompt('gimme vote');
    const payload = { voteCardIndex: +voteIndex };
    props.sendAction('vote', payload);
  };

  const putChest = () => {
    const lastAction = props.data.lastAction;
    const payload = {};
    if (
      lastAction?.actionType === 'call for an attack' &&
      lastAction?.actionData.whichCaptain.username === props.username &&
      lastAction?.actionData.state === 'success' &&
      lastAction?.actionData.fromOtherShip
    ) {
      payload.fromWhichTeam = prompt(
        'which side you want to steal a chest? 1) BRITAIN, 2) FRANCE'
      );
    }
    payload.whichTeam = prompt(
      'which side you want to put the chest? 1) BRITAIN, 2) FRANCE'
    );
    props.sendAction('put chest', payload);
  };

  if (props.data.turn.username === props.username) {
    output = props.data.playerGameInfo.availableActions.map((action, index) => {
      let click = () => props.sendAction(action);
      if (action === 'vote') click = vote;
      if (action === 'put chest') click = putChest;

      return (
        <button onClick={click} key={index}>
          {action}
        </button>
      );
    });
  }

  return <div className={styles.GameAction}>{output}</div>;
}

export default GameAction;
