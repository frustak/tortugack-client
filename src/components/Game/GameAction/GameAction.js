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

      if (action === 'put chest') click = props.putChestHandler;
      if (action === 'maroon any crew mate to tortuga') {
        click = props.maroonHandler;
        icon = maroonIcon;
      }
      if (action === 'move') {
        click = props.moveHandler;
        icon = moveIcon;
      }
      if (action === 'move treasure') {
        click = props.moveChestHandler;
        icon = moveChestIcon;
      }
      if (action === 'vote') {
        click = props.showModal;
        icon = voteCardIcon;
        props.setVoteClickable(true);
      }
      if (action === 'view two event cards') {
        click = props.viewTwoCardsHandler;
        icon = twoEventIcon;
      }
      if (action === 'reveal one event card') {
        icon = cardIcon;
      }
      if (action === 'force another player to choose card') {
        icon = forceCardIcon;
      }
      if (action === 'call for a mutiny') {
        icon = mutinyIcon;
      }
      if (action === 'call for an attack') {
        icon = attackIcon;
      }
      if (action === 'put chest') {
        icon = moveChestIcon;
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
