import React from 'react';
import styles from './Loading.module.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';

function Loading({ show }) {
  let output = null;
  if (show) output = <CircularProgress className={styles.Loading} />;
  return output;
}

const mapStateToProps = state => {
  return { show: state.loading.show };
};

export default connect(mapStateToProps)(Loading);
