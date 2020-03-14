import React, { useState } from 'react';
import styles from './App.module.css';
import Map from '../../components/Map/Map';
import Cells from '../../components/Cells/Cells';
import Modal from '../../components/Modal/Modal';
import Alert from '../../components/UI/Alert/Alert';

function App(props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [alertData, setAlertData] = useState({ show: false, message: '' });

  const showAlert = msg => {
    setAlertData({ show: true, message: msg });
  };

  const hideAlert = () => {
    setAlertData({ show: false, message: alertData.message });
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className={styles.App}>
      <Map />
      <Cells />
      {gameStarted ? null : <Modal toggleAlert={showAlert} startGame={startGame}/>}
      <Alert data={alertData} hideAlert={hideAlert} />
    </div>
  );
}

export default App;
