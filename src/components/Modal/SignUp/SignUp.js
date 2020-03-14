import React from 'react';
import styles from './SignUp.module.css';

function SignUp(props) {
  return (
    <div className={styles.SignUp}>
      <label>username</label>
      <input />
      <label>password</label>
      <input />
      <label>email</label>
      <input />
      <button>sign in</button>
      <button>sign up</button>
    </div>
  );
}

export default SignUp;