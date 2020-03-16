import React, { useState } from 'react';
import styles from './SignIn.module.css';

function SignIn(props) {
  const enterKeyPress = event => {
    if (event.key === 'Enter') props.clickHandler();
  };

  return (
    <div className={styles.SignIn}>
      <div className={styles.Content}>
        <input
          placeholder="username"
          onChange={event => props.setUsername(event.target.value)}
          onKeyDown={enterKeyPress}
          autoFocus
        />
        <input
          placeholder="password"
          onChange={event => props.setPassword(event.target.value)}
          onKeyDown={enterKeyPress}
        />
        <button onClick={props.clickHandler}>Sign in</button>
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
