import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import * as modalTypes from '../../../constants/modalTypes';
import { showModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';
import styles from './GameAction.module.css';

import moveIcon from '../../../assets/icons/move.png';
import twoEventIcon from '../../../assets/icons/two-cards.png';
import cardIcon from '../../../assets/icons/card.png';
import forceCardIcon from '../../../assets/icons/force-card.png';
import mutinyIcon from '../../../assets/icons/mutiny.png';
import brawlIcon from '../../../assets/icons/brawl.png';
import attackIcon from '../../../assets/icons/attack.png';
import maroonIcon from '../../../assets/icons/maroon.png';
import putChestIcon from '../../../assets/icons/move-chest.png';
import voteIcon from '../../../assets/icons/vote-card.png';
import useEventIcon from '../../../assets/icons/use-card.png';
import keepEventIcon from '../../../assets/icons/keep-card.png';
import eventCardsIcon from '../../../assets/icons/event-cards.png';

const useStyles = makeStyles({
  root: {
    margin: '2px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function GameAction({ data, doGameAction, showModal }) {
  const classes = useStyles();

  const output = data.playerGameInfo.availableActions.map((action, index) => {
    let icon;
    let click = () => doGameAction(action);

    switch (action) {
      case 'put chest':
        icon = putChestIcon;
        click = () => showModal(modalTypes.PUT_CHEST_MODAL);
        break;
      case 'maroon any crew mate to tortuga':
        icon = maroonIcon;
        click = () => showModal(modalTypes.MAROON_MODAL);
        break;
      case 'move':
        icon = moveIcon;
        click = () => showModal(modalTypes.MOVE_MODAL);
        break;
      case 'move treasure':
        icon = putChestIcon;
        click = () => showModal(modalTypes.MOVE_CHEST_MODAL);
        break;
      case 'vote':
        icon = voteIcon;
        click = () => showModal(modalTypes.VOTE_CARD_MODAL);
        break;
      case 'view two event cards':
        icon = twoEventIcon;
        click = () => showModal(modalTypes.VIEW_TWO_EVENT_CARDS_MODAL);
        break;
      case 'reveal one event card':
        icon = cardIcon;
        click = () => showModal(modalTypes.REVEAL_CARD_MODAL);
        break;
      case 'force another player to choose card':
        icon = forceCardIcon;
        click = () => showModal(modalTypes.FORCE_PLAYER_CHOOSE_MODAL);
        break;
      case 'USE-EVENT-CARD':
        icon = useEventIcon;
        click = async () => {
          await doGameAction('SEE-EVENT-CARD-OPTIONS', {
            eventCardToSeeSlug: data.lastAction.actionData.eventCard.slug,
          });
          showModal(modalTypes.CARD_OPTION_MODAL);
        };
        break;
      case 'KEEP-EVENT-CARD':
        icon = keepEventIcon;
        break;
      case 'call for a mutiny':
        icon = mutinyIcon;
        break;
      case 'call for an attack':
        icon = attackIcon;
        break;
      case 'call for brawl':
        icon = brawlIcon;
        break;
      default:
        return null;
    }

    return (
      <Button variant="outlined" onClick={click} key={action} classes={classes}>
        {action}
        <img src={icon} alt="" className={styles.icon} />
      </Button>
    );
  });

  if (!data.playerGameInfo.availableActions.some(action => action === 'vote')) {
    output.push(
      <Button
        variant="outlined"
        classes={classes}
        key="view-my-vote-cards"
        onClick={() => showModal(modalTypes.MY_VOTE_CARDS_MODAL)}
      >
        view my vote cards
        <img src={voteIcon} alt="" className={styles.icon} />
      </Button>
    );
  }

  if (data?.playerGameInfo?.eventCards?.length > 0) {
    output.push(
      <Button
        key="view-my-event-cards"
        variant="outlined"
        classes={classes}
        onClick={() => showModal(modalTypes.MY_EVENTS_MODAL)}
      >
        view my event cards
        <img src={eventCardsIcon} alt="" className={styles.icon} />
      </Button>
    );
  }

  return <div className={styles.gameAction}>{output}</div>;
}

const mapStateToProps = state => {
  return {
    data: state.game.data.gameStatus,
    username: state.user.username,
  };
};

export default connect(mapStateToProps, {
  doGameAction,
  showModal,
})(GameAction);
