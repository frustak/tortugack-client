import React from 'react';
import styles from './SignIn.module.css';

function SignIn(props) {
  return (
    <div className={styles.SignIn}>
      <div className={styles.Content}>
        <input placeholder="username" />
        <input placeholder="password" />
        <button>Sign in</button>
        <button onClick={props.toggleAlert}>or Sign up</button>
      </div>
    </div>
  );
}

export default SignIn;
