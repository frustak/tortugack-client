import React, { useState } from 'react';
import styles from './App.module.css';
import Map from '../../components/Map/Map';
import Cells from '../../components/Cells/Cells';
import Modal from '../../components/Modal/Modal';
import Alert from '../../components/UI/Alert/Alert';
import Spinner from '../../components/UI/Spinner/Spinner';

function App(props) {
  const [gameStarted, setGameStarted] = useState(false);
  const [alertData, setAlertData] = useState({ show: false, message: '' });
  const [loading, setLoading] = useState(false);

  const showAlert = (msg, type) => {
    setAlertData({ show: true, message: msg, type: type });
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
      {gameStarted ? null : (
        <Modal
          toggleAlert={showAlert}
          startGame={startGame}
          setLoading={setLoading}
        />
      )}
      <Alert data={alertData} hideAlert={hideAlert} />
      <Spinner loading={loading} />
    </div>
  );
}

export default App;
