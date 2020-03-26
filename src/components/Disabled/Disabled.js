import React from 'react';
import styles from './Disabled.module.css';

function Disabled(props) {
  return props.is ? <div className={styles.Disabled}></div> : null;
}

export default Disabled;
