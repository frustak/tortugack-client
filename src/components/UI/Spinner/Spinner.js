import React from 'react';
import styles from './Spinner.module.css';
import Loader from 'react-spinners/CircleLoader';

function Spinner(props) {
  return (
    <div className={styles.Spinner}>
      <Loader loading={props.loading} size={64} />
    </div>
  );
}

export default Spinner;
