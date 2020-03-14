import React, { useState } from 'react';
import styles from './Modal.module.css';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

function Modal(props) {
  const [isSignIn, setIsSignIn] = useState(true);
  let output = '';

  if (isSignIn) {
    output = (
      <SignIn
        signUpClicked={() => setIsSignIn(false)}
        toggleAlert={props.toggleAlert}
      />
    );
  } else {
    output = <SignUp signInClicked={() => setIsSignIn(true)} />;
  }

  return <div className={styles.Modal}>{output}</div>;
}

export default Modal;
