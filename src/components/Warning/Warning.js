import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import styles from './Warning.module.css';

function Warning(props) {
  const message = props.msg ? props.msg : 'Something went wrong 😟';

  if (props.show)
    return (
      <div className={styles.Warning}>
        <Alert severity="error" onClose={props.close}>
          <AlertTitle>Error</AlertTitle>
          {message}
        </Alert>
      </div>
    );
  else return null;
}

export default Warning;
