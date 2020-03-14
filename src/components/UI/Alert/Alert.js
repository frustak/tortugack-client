import React from 'react';
import styles from './Alert.module.css';

function Alert(props) {
  const classes = [styles.Alert];
  if (!props.data.show) classes.push(styles.Closed);

  return (
    <div className={classes.join(' ')}>
      <p>{props.data.message}</p>
      <button onClick={props.hideAlert}>x</button>
    </div>
  );
}

export default Alert;
