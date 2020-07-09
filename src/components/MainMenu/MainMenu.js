import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import * as modalTypes from '../../constants/modalTypes';
import { showModal } from '../../actions/modalActions/modalActions';
import { createLobby } from '../../actions/lobbyActions/lobbyActions';
import { logoutUser } from '../../actions/userActions/userActions';
import styles from './MainMenu.module.css';

function MainMenu({ history, username, showModal, createLobby, logoutUser }) {
  const renderButton = ({ text, color = 'primary' }, onClick) => {
    return (
      <Button variant="outlined" color={color} onClick={onClick}>
        {text}
      </Button>
    );
  };

  const onLobbiesClick = () => {
    history.push('/lobbies');
  };

  const onJoinByIdClick = () => {
    showModal(modalTypes.JOIN_LOBBY_MODAL);
  };

  const onCreateLobbyClick = () => {
    createLobby();
  };

  const onSignOutClick = () => {
    logoutUser();
  };

  return (
    <div className={styles.mainMenu}>
      <div className={styles.content}>
        <p>Welcome {username}</p>
        {renderButton({ text: 'lobbies' }, onLobbiesClick)}
        {renderButton({ text: 'join by id' }, onJoinByIdClick)}
        {renderButton({ text: 'create lobby' }, onCreateLobbyClick)}
        {renderButton({ text: 'sign out', color: 'secondary' }, onSignOutClick)}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
  };
};

export default connect(mapStateToProps, {
  showModal,
  createLobby,
  logoutUser,
})(MainMenu);
