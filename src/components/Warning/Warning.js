import React from 'react';
import { connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

import styles from './Warning.module.css';
import { hideError } from '../../actions/errorActions/errorActions';

function Warning({ errorMsg, hideError }) {
  if (!errorMsg) return null;
  return (
    <div className={styles.warning}>
      <Alert severity="error" onClose={hideError}>
        <AlertTitle>Error</AlertTitle>
        {errorMsg}
      </Alert>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    errorMsg: state.error.errorMsg,
  };
};

export default connect(mapStateToProps, { hideError })(Warning);
