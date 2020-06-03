import React from 'react';
import styles from './GameAction.module.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

import moveIcon from '../../../assets/icons/move.png';
import twoEventIcon from '../../../assets/icons/two-cards.png';
import cardIcon from '../../../assets/icons/card.png';
import forceCardIcon from '../../../assets/icons/force-card.png';
import mutinyIcon from '../../../assets/icons/mutiny.png';
import brawlIcon from '../../../assets/icons/brawl.png';
import attackIcon from '../../../assets/icons/attack.png';
import maroonIcon from '../../../assets/icons/maroon.png';
import moveChestIcon from '../../../assets/icons/move-chest.png';
import voteCardIcon from '../../../assets/icons/vote-card.png';
import useCardIcon from '../../../assets/icons/use-card.png';
import keepCardIcon from '../../../assets/icons/keep-card.png';
import eventCardsIcon from '../../../assets/icons/event-cards.png';
import { sendGameAction, handleModal } from '../../../actions';

import PutChestModal from '../../UI/modal-contents/Modals/PutChestModal/PutChestModal';
import MaroonModal from '../../UI/modal-contents/Modals/MaroonModal/MaroonModal';
import MoveModal from '../../UI/modal-contents/Modals/MoveModal/MoveModal';
import MoveChestModal from '../../UI/modal-contents/Modals/MoveChestModal/MoveChestModal';
import TwoEventCardsModal from '../../UI/modal-contents/Modals/TwoEventCardsModal/TwoEventCardsModal';
import RevealCardModal from '../../UI/modal-contents/Modals/RevealCardModal/RevealCardModal';
import VoteCardModal from '../../UI/modal-contents/VoteCardModal/VoteCardModal';
import CardOptionModal from '../../UI/modal-contents/Modals/CardOptionModal/CardOptionModal';
import MyEventsModal from '../../UI/modal-contents/Modals/MyEventsModal/MyEventsModal';

const useStyles = makeStyles({
  root: {
    margin: '2px',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

function GameAction({ data, username, sendGameAction, handleModal }) {
  const classes = useStyles();

  const output = data.playerGameInfo.availableActions.map((action, index) => {
    let icon;
    let click = () => sendGameAction(action);

    switch (action) {
      case 'put chest':
        icon = moveChestIcon;
        click = () => handleModal(true, <PutChestModal />);
        break;
      case 'maroon any crew mate to tortuga':
        click = () => handleModal(true, <MaroonModal />);
        icon = maroonIcon;
        break;
      case 'move':
        click = () => handleModal(true, <MoveModal />);
        icon = moveIcon;
        break;
      case 'move treasure':
        click = () => handleModal(true, <MoveChestModal />);
        icon = moveChestIcon;
        break;
      case 'vote':
        click = () => handleModal(true, <VoteCardModal clickable />);
        icon = voteCardIcon;
        break;
      case 'view two event cards':
        click = () => handleModal(true, <TwoEventCardsModal />);
        icon = twoEventIcon;
        break;
      case 'reveal one event card':
        click = () => handleModal(true, <RevealCardModal />);
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
      case 'call for brawl':
        icon = brawlIcon;
        break;
      case 'USE-EVENT-CARD':
        icon = useCardIcon;

        click = async () => {
          await sendGameAction('SEE-EVENT-CARD-OPTIONS', {
            eventCardToSeeSlug: data.lastAction.actionData.eventCard.slug,
          });
          handleModal(true, <CardOptionModal />);
        };

        break;
      case 'KEEP-EVENT-CARD':
        icon = keepCardIcon;
        break;
      default:
    }

    return (
      <Button variant="outlined" onClick={click} key={index} classes={classes}>
        {action}
        <img src={icon} alt="" className={styles.Icon} />
      </Button>
    );
  });

  const voteCardsButton = (
    <Button
      variant="outlined"
      classes={classes}
      onClick={() => handleModal(true, <VoteCardModal />)}
    >
      view my vote cards
      <img src={voteCardIcon} alt="" className={styles.Icon} />
    </Button>
  );

  let myEventCardsButton = null;
  if (data.playerGameInfo.eventCards.length > 0) {
    myEventCardsButton = (
      <Button
        variant="outlined"
        classes={classes}
        onClick={() => handleModal(true, <MyEventsModal />)}
      >
        view my event cards
        <img src={eventCardsIcon} alt="" className={styles.Icon} />
      </Button>
    );
  }

  return (
    <div className={styles.GameAction}>
      {output}
      {voteCardsButton}
      {myEventCardsButton}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    data: state.game.data.gameStatus,
    username: state.user.username,
  };
};

export default connect(mapStateToProps, { sendGameAction, handleModal })(
  GameAction
);
