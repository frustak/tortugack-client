import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import Lobby from './Lobby/Lobby';
import styles from './Lobbies.module.css';
import { fetchLobbies, joinLobby } from '../../actions';

class Lobbies extends React.Component {
  componentDidMount() {
    this.props.fetchLobbies();
  }

  render() {
    if (!this.props.lobbies) return null;

    const lobbies = this.props.lobbies.map(lobby => (
      <Lobby data={lobby} key={lobby.id} showBtn joinLobby={this.props.joinLobby} />
    ));

    return (
      <>
        <div className={styles.Buttons}>
          <Button color="primary" onClick={this.props.fetchLobbies}>
            refresh
          </Button>
          <Button
            color="secondary"
            onClick={() => this.props.history.push('/main-menu')}
          >
            back
          </Button>
        </div>
        <div className={styles.Lobbies}>{lobbies}</div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return { lobbies: state.lobby.lobbies };
};

export default connect(mapStateToProps, { fetchLobbies, joinLobby })(Lobbies);
