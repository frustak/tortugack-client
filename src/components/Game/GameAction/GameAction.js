import React from 'react';
import styles from './GameAction.module.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import moveIcon from '../../../assets/icons/move.png';
import twoEventIcon from '../../../assets/icons/two-cards.png';
import cardIcon from '../../../assets/icons/card.png';
import forceCardIcon from '../../../assets/icons/force-card.png';
import mutinyIcon from '../../../assets/icons/mutiny.png';
import attackIcon from '../../../assets/icons/attack.png';
import maroonIcon from '../../../assets/icons/maroon.png';
import moveChestIcon from '../../../assets/icons/move-chest.png';
import voteCardIcon from '../../../assets/icons/vote-card.png';
import useCardIcon from '../../../assets/icons/use-card.png';
import keepCardIcon from '../../../assets/icons/keep-card.png';

const useStyles = makeStyles({
  root: {
    margin: '2px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function GameAction(props) {
  const classes = useStyles();

  const output = props.data.playerGameInfo.availableActions.map(
    (action, index) => {
      let icon;
      let click = () => props.sendAction(action);

      switch (action) {
        case 'put chest':
          icon = moveChestIcon;
          click = props.putChestHandler;
          break;
        case 'maroon any crew mate to tortuga':
          click = props.maroonHandler;
          icon = maroonIcon;
          break;
        case 'move':
          click = props.moveHandler;
          icon = moveIcon;
          break;
        case 'move treasure':
          click = props.moveChestHandler;
          icon = moveChestIcon;
          break;
        case 'vote':
          click = props.showModal;
          icon = voteCardIcon;
          props.setVoteClickable(true);
          break;
        case 'view two event cards':
          click = props.viewTwoCardsHandler;
          icon = twoEventIcon;
          break;
        case 'reveal one event card':
          click = props.revealCardHandler;
          icon = cardIcon;
          break;
        case 'force another player to choose card':
          icon = forceCardIcon;
          break;
        case 'call for a mutiny':
          icon = mutinyIcon;
          break;
        case 'call for an attack':
          icon = attackIcon;
          break;
        case 'USE-EVENT-CARD':
          icon = useCardIcon;
          click = props.sendAction('SEE-EVENT-CARD-OPTIONS');
          break;
        case 'KEEP-EVENT-CARD':
          icon = keepCardIcon;
          break;
        default:
      }

      return (
        <Button
          variant="outlined"
          onClick={click}
          key={index}
          classes={classes}
        >
          {action}
          <img src={icon} alt="" className={styles.Icon} />
        </Button>
      );
    }
  );

  let voteBtn = (
    <Button variant="outlined" onClick={props.showModal} classes={classes}>
      vote cards
      <img src={voteCardIcon} alt="" className={styles.Icon} />
    </Button>
  );
  if (
    props.data.playerGameInfo.availableActions.some(action => action === 'vote')
  ) {
    voteBtn = null;
  } else {
    props.setVoteClickable(false);
  }

  return (
    <div className={styles.GameAction}>
      {output}
      {voteBtn}
    </div>
  );
}

export default GameAction;
