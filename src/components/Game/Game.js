import React from 'react';
import { connect } from 'react-redux';

import styles from './Game.module.css';
import GameMap from './GameMap/GameMap';
import GameAction from './GameAction/GameAction';
import { startGamePolling, stopGamePolling } from '../../actions';

class Game extends React.Component {
  componentDidMount() {
    this.props.startGamePolling();
  }

  componentWillUnmount() {
    this.props.stopGamePolling();
  }

  render() {
    if (!this.props.gameData) return null;

    return (
      <div className={styles.Game}>
        <div className={styles.row}>
          <GameMap />
          <GameAction />
        </div>
        {/* <GameInfo /> */}
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
})(Game);
