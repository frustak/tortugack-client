import React, { useState } from 'react';
import styles from './Modal.module.css';
import SignIn from './SignIn/SignIn';
import Lobby from './Lobby/Lobby';
import axios from 'axios';

function Modal(props) {
  const [lobbyData, setLobbyData] = useState({ show: false, data: null });

  const login = async username => {
    props.setLoading(true);

    const response = await axios.post(
      'https://tortugack.herokuapp.com/api/v1/token',
      {
        username: username,
      }
    );

    if (response.status < 300 && response.status >= 200) {
      props.toggleAlert('Welcome nigga welcome good ass bitch XD');
    } else {
      props.toggleAlert('Wrong nigga Wrong get the fuck outta here');
      return;
    }

    const getLobby = async () => {
      const response = await axios.get(
        'https://tortugack.herokuapp.com/api/v1/lobby'
      );
      return response.data;
    };

    setLobbyData({ show: true, data: await getLobby() });
    props.setLoading(false);
  };

  const output = lobbyData.show ? (
    <Lobby data={lobbyData.data} startGame={props.startGame} />
  ) : (
    <SignIn login={login} toggleAlert={props.toggleAlert} />
  );

  return <div className={styles.Modal}>{output}</div>;
}

export default Modal;
