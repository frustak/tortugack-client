import React from 'react';
import { connect } from 'react-redux';

import styles from './Game.module.css';
import GameMap from './GameMap/GameMap';
import GameAction from './GameAction/GameAction';
import { startGamePolling, stopGamePolling, handleModal } from '../../actions';
import GameInfo from './GameInfo/GameInfo';
import WinnerModal from '../UI/modal-contents/Modals/WinnerModal/WinnerModal';

class Game extends React.Component {
  componentDidMount() {
    this.props.startGamePolling();
    if (this.props.gameData?.gameStatus?.winner) {
      this.props.handleModal(true, <WinnerModal />);
    }
  }

  componentWillUnmount() {
    this.props.stopGamePolling();
  }

  componentDidUpdate() {
    console.log(this.props);
    if (this.props.gameData?.gameStatus?.winner) {
      this.props.handleModal(true, <WinnerModal />);
    }
  }

  render() {
    if (!this.props.gameData) return null;

    return (
      <div className={styles.Game}>
        <div className={styles.row}>
          <GameMap />
          <GameAction />
        </div>
        <GameInfo />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { gameData: state.game.data };
};

export default connect(mapStateToProps, {
  startGamePolling,
  stopGamePolling,
  handleModal,
})(Game);
