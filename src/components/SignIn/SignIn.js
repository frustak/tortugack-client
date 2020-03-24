import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styles from './SignIn.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    marginBottom: '8px',
  },
});

function SignIn(props) {
  const enterKeyPress = event => {
    if (event.key === 'Enter') props.login();
  };

  const classes = useStyles();
  return (
    <div className={styles.SignIn}>
      <div className={styles.Content}>
        <TextField
          type="text"
          autoFocus
          onChange={props.usernameHandler}
          onKeyUp={enterKeyPress}
          variant="outlined"
          label="Username"
          color="primary"
          className={classes.root}
        />
        <Button variant="contained" color="primary" onClick={props.login}>
          login
        </Button>
      </div>
    </div>
  );
}

export default SignIn;
