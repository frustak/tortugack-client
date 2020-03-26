import React from 'react';
import Button from '@material-ui/core/Button';
import styles from './MainMenu.module.css';

function MainMenu(props) {
  return (
    <div className={styles.MainMenu}>
      <div className={styles.Content}>
        <p>Welcome {props.username}</p>
        <Button variant="outlined" color="primary" onClick={props.showLobbies}>
          lobbies
        </Button>
        <Button variant="outlined" color="primary" onClick={props.joinLobby}>
          join by id
        </Button>
        <Button variant="outlined" color="primary" onClick={props.createLobby}>
          create game
        </Button>
        <Button variant="outlined" color="secondary" onClick={props.logout}>
          sign out
        </Button>
      </div>
    </div>
  );
}

export default MainMenu;
