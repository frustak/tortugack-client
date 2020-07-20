import React from 'react';
import Divider from '@material-ui/core/Divider';

import styles from './Activity.module.css';

function Activity({ text }) {
  return (
    <>
      <div className={styles.activity}>{text}</div>
      <Divider />
    </>
  );
}

export default Activity;
