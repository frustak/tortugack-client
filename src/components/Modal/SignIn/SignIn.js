import React from 'react';
import styles from './SignIn.module.css';

function SignIn(props) {
  return (
    <div className={styles.SignIn}>
      <div className={styles.Content}>
        <input placeholder="username" />
        <input placeholder="password" />
        <button onClick={props.login}>Sign in</button>
        <button
          onClick={() => props.toggleAlert('Gool khordi sabte nam nemikhad XD')}
        >
          or Sign up
        </button>
      </div>
    </div>
  );
}

export default SignIn;
