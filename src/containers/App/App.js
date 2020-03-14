import React, { useState } from 'react';
import styles from './App.module.css';
import Map from '../../components/Map/Map';
import Cells from '../../components/Cells/Cells';
import Modal from '../../components/Modal/Modal';
import Alert from '../../components/UI/Alert/Alert';

function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);

  const toggleAlert = () => setIsAlertShown(!isAlertShown);

  return (
    <div className={styles.App}>
      <Map />
      <Cells />
      {isLoggedIn ? null : <Modal toggleAlert={toggleAlert} />}
      {isAlertShown ? <Alert /> : null}
    </div>
  );
}

export default App;
