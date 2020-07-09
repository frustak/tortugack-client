import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import { fetchLobbies, joinLobby } from '../../actions/lobbyActions/lobbyActions';
import styles from './Lobbies.module.css';
import Lobby from './Lobby/Lobby';

function Lobbies({ history, lobbies, fetchLobbies, joinLobby }) {
  useEffect(() => {
    fetchLobbies();
  }, [fetchLobbies]);

  const renderLobbies = () => {
    return lobbies?.map(lobby => (
      <Lobby data={lobby} key={lobby.id} showBtn joinLobby={joinLobby} />
    ));
  };

  return (
    <>
      <div className={styles.Buttons}>
        <Button color="primary" onClick={fetchLobbies}>
          refresh
        </Button>
        <Button color="secondary" onClick={() => history.push('/main-menu')}>
          back
        </Button>
      </div>
      <div className={styles.Lobbies}>{renderLobbies()}</div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    lobbies: state.lobby.lobbies,
  };
};

export default connect(mapStateToProps, { fetchLobbies, joinLobby })(Lobbies);
