import React from 'react';
import * as modalTypes from '../../constants/modalTypes';

import PutChestModal from '../Modals/PutChestModal/PutChestModal';
import MaroonModal from '../Modals/MaroonModal/MaroonModal';
import MoveModal from '../Modals/MoveModal/MoveModal';
import MoveChestModal from '../Modals/MoveChestModal/MoveChestModal';
import VoteCardModal from '../Modals/VoteCardModal/VoteCardModal';
import ViewTwoEventCardsModal from '../Modals/ViewTwoEventCardsModal/ViewTwoEventCardsModal';
import RevealCardModal from '../Modals/RevealCardModal/RevealCardModal';
import ForcePlayerChooseModal from '../Modals/ForcePlayerChooseModal/ForcePlayerChooseModal';
import CardOptionModal from '../Modals/CardOptionModal/CardOptionModal';
import MyEventsModal from '../Modals/MyEventsModal/MyEventsModal';
import RevealedEventCardModal from '../Modals/RevealedEventCardsModal/RevealedEventCardsModal';
import LastRevealedCardModal from '../Modals/RevealCardModal/LastRevealedCardModal';
import ForceRevealCardModal from '../Modals/ForcePlayerChooseModal/ForceRevealCardModal';
import WinnerModal from '../Modals/WinnerModal/WinnerModal';

const renderModalContent = (type, data) => {
  switch (type) {
    case modalTypes.PUT_CHEST_MODAL:
      return <PutChestModal />;
    case modalTypes.MAROON_MODAL:
      return <MaroonModal />;
    case modalTypes.MOVE_MODAL:
      return <MoveModal />;
    case modalTypes.MOVE_CHEST_MODAL:
      return <MoveChestModal />;
    case modalTypes.VOTE_CARD_MODAL:
      return <VoteCardModal clickable />;
    case modalTypes.VIEW_TWO_EVENT_CARDS_MODAL:
      return <ViewTwoEventCardsModal />;
    case modalTypes.REVEAL_CARD_MODAL:
      return <RevealCardModal />;
    case modalTypes.FORCE_PLAYER_CHOOSE_MODAL:
      return <ForcePlayerChooseModal />;
    case modalTypes.CARD_OPTION_MODAL:
      return <CardOptionModal />;
    case modalTypes.MY_VOTE_CARDS_MODAL:
      return <VoteCardModal />;
    case modalTypes.MY_EVENTS_MODAL:
      return <MyEventsModal />;
    case modalTypes.REVEALED_EVENT_CARDS_MODAL:
      return <RevealedEventCardModal />;
    case modalTypes.LAST_REVEALED_CARD_MODAL:
      return <LastRevealedCardModal />;
    case modalTypes.FORCE_REVEAL_CARD_MODAL:
      return <ForceRevealCardModal forcedPlayer={data.forcedPlayer} />;
    case modalTypes.WINNER_MODAL:
      return <WinnerModal />;
    default:
      return null;
  }
};

export default renderModalContent;
