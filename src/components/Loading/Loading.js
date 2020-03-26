import React from 'react';
import styles from './Loading.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';

function Loading(props) {
  let output = null;
  if (props.show) output = <CircularProgress className={styles.Loading} />;
  return output;
}

export default Loading;
