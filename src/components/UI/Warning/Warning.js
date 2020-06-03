import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { connect } from 'react-redux';
import styles from './Warning.module.css';
import { closeError } from '../../../actions';

function Warning({ errorMsg, closeError }) {
  if (!errorMsg) return null;
  return (
    <div className={styles.Warning}>
      <Alert severity="error" onClose={closeError}>
        <AlertTitle>Error</AlertTitle>
        {errorMsg}
      </Alert>
    </div>
  );
}

const mapStateToProps = state => {
  return { errorMsg: state.error.errorMsg };
};

export default connect(mapStateToProps, { closeError })(Warning);
