import React, { useState } from 'react';
import styles from './Modal.module.css';
import SignIn from './SignIn/SignIn';
import Lobby from './Lobby/Lobby';
import axios from 'axios';

function Modal(props) {
  const [isLobby, setIsLobby] = useState(false);

  const login = async () => {
    const response = await axios.post(
      'https://tortugack.herokuapp.com/api/v1/token',
      {
        username: 'frost',
      }
    );
    alert(response.data);
    setIsLobby(true);
  };

  const output = isLobby ? (
    <Lobby startGame={props.startGame} />
  ) : (
    <SignIn login={login} toggleAlert={props.toggleAlert} />
  );

  return <div className={styles.Modal}>{output}</div>;
}

export default Modal;
