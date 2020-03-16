import React from 'react';
import styles from './MainMenu.module.css';
import Lobbies from './Lobbies/Lobbies';

function MainMenu(props) {
  return (
    <div className={styles.MainMenu}>
      <p className={styles.Welcome}>Welcome {props.username}</p>
      <button>JOIN BY ID</button>
      <button onClick={props.createLobby}>CREATE GAME</button>
      <button onClick={props.logout}>SIGN OUT</button>
      <Lobbies lobbiesData={props.lobbiesData} />
    </div>
  );
}

export default MainMenu;
