import React, { useState } from 'react';
import styles from './SignIn.module.css';

function SignIn(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const clickHandler = () => {
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
    props.login(username);
  };

  return (
    <div className={styles.SignIn}>
      <div className={styles.Content}>
        <input
          placeholder="username"
          onChange={event => setUsername(event.target.value)}
        />
        <input
          placeholder="password"
          onChange={event => setPassword(event.target.value)}
        />
        <button onClick={clickHandler}>Sign in</button>
        <button
          onClick={() =>
            props.toggleAlert('Gool khordi sabte nam nemikhad XD', 'Info')
          }
        >
          or Sign up
        </button>
      </div>
    </div>
  );
}

export default SignIn;
