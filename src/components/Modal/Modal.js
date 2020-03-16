import React, { useState } from 'react';
import styles from './Modal.module.css';
import SignIn from './SignIn/SignIn';
import MainMenu from './MainMenu/MainMenu';
import axios from '../../services/axios';

function Modal(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [lobbies, setLobbies] = useState({ show: false, data: null });

  const login = async username => {
    props.setLoading(true);
    try {
      const response = await axios.post('/token', {
        username: username,
      });
      props.toggleAlert('Welcome nigga welcome 😊', 'Success');
      document.cookie = `token=${response.data.access_token}`;
      loadLobby();
    } catch (error) {
      console.error(error);
      props.toggleAlert('Wrong nigga Wrong something went Wrong 😞', 'Warn');
    }
    props.setLoading(false);
  };

  const loadLobby = async () => {
    props.setLoading(true);
    try {
      const response = await axios.get('/lobby');
      setLobbies({ show: true, data: response.data });
    } catch (error) {
      console.error(error);
      props.toggleAlert('Wrong nigga Wrong something went Wrong 😞', 'Warn');
      return;
    }
    props.setLoading(false); // TODO: get out of loading!
  };

  const loginClickHandler = () => {
    if (!username.trim()) {
      props.toggleAlert('Username ro vared kon bishoor', 'Warn');
      return;
    }

    if (password) {
      props.toggleAlert(
        'Gool khordi password nemikhad vali mibaramet too :P',
        'Success'
      );
    }
    login(username);
  };

  const createLobby = async () => {
    const response = await axios.post('/lobby');
  };

  const logout = () => {
    setLobbies({ ...lobbies, show: false });
    props.toggleAlert('Signed out!', 'Success');
  };

  const output = lobbies.show ? (
    <MainMenu
      username={username}
      lobbiesData={lobbies.data}
      logout={logout}
      createLobby={createLobby}
    />
  ) : (
    <SignIn
      setUsername={setUsername}
      setPassword={setPassword}
      clickHandler={loginClickHandler}
      toggleAlert={props.toggleAlert}
    />
  );

  return <div className={styles.Modal}>{output}</div>;
}

export default Modal;
