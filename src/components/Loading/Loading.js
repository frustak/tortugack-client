import React from 'react';
import styles from './Loading.module.css';

function Loading(props) {
  let output = null;
  if (props.show) output = <div className={styles.Loading}>loading...</div>;
  return output;
}

export default Loading;
