import React from 'react';
import styles from './GameAction.module.css';

function GameAction(props) {
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
    const choice = prompt(
      'which side you want to put the chest? 1) BRITAIN, 2) FRANCE'
    );
    if (choice === '1') payload.whichTeam = 'BRITAIN';
    if (choice === '2') payload.whichTeam = 'FRANCE';
    props.sendAction('put chest', payload);
  };

  const maroonCrew = () => {
    const crewToMaroon = prompt('who do you want to maroon?');
    props.sendAction('maroon any crew mate to tortuga', { crewToMaroon });
  };

  const move = () => {
    let moveWhere;
    const position = props.data.playersPosition[props.username];
    if (position.startsWith('jr')) moveWhere = 'jr_b';
    if (position.startsWith('fd')) moveWhere = 'fd_b';
    if (position.startsWith('tr')) {
      const input = prompt(
        'where you wanna go? 1) jolly roger boat, 2) flying dutchman boat'
      );
      if (input === '1') moveWhere = 'jr_b';
      if (input === '2') moveWhere = 'fd_b';
    }
    if (position === 'jr_b') {
      const input = prompt(
        'where you wanna go? 1) tortuga island, 2) jolly roger ship'
      );
      if (input === '1') moveWhere = 'tr';
      if (input === '2') moveWhere = 'jr';
    }
    if (position === 'fd_b') {
      const input = prompt(
        'where you wanna go? 1) tortuga island, 2) flying dutchman ship'
      );
      if (input === '1') moveWhere = 'tr';
      if (input === '2') moveWhere = 'fd';
    }
    props.sendAction('move', { moveWhere });
  };

  const stealChest = () => {
    const choice = prompt(
      'which team you want to steal from? 1) britain, 2) france'
    );
    let fromHold;
    if (choice === '1') fromHold = 'BRITAIN';
    if (choice === '2') fromHold = 'FRANCE';
    props.sendAction('move treasure', { fromHold });
  };

  const output = props.data.playerGameInfo.availableActions.map(
    (action, index) => {
      let click = () => props.sendAction(action);
      if (action === 'vote') click = vote;
      if (action === 'put chest') click = putChest;
      if (action === 'maroon any crew mate to tortuga') click = maroonCrew;
      if (action === 'move') click = move;
      if (action === 'move treasure') click = stealChest;

      return (
        <button onClick={click} key={index}>
          {action}
        </button>
      );
    }
  );

  return <div className={styles.GameAction}>{output}</div>;
}

export default GameAction;
