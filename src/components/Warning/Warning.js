import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import styles from './Warning.module.css';

function Warning(props) {
  if (props.show)
    return (
      <div className={styles.Warning}>
        <Alert severity="error" onClose={props.close}>
          <AlertTitle>Error</AlertTitle>
          Something went wrong 😟
        </Alert>
      </div>
    );
  else return null;
}

export default Warning;
