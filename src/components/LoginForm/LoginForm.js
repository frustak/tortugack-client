import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import styles from './LoginForm.module.css';
import skull from '../../assets/skull.png';
import { login } from '../../actions';

const useStyles = makeStyles({
  root: {
    marginBottom: '8px',
  },
  howToPlayButton: {
    marginTop: '8px',
    backgroundColor: '#4CAF50',
    color: 'white',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  },
});

function LoginForm({ login }) {
  const classes = useStyles();

  const enterKeyPress = event => {
    if (event.key === 'Enter') login();
  };

  const renderInput = ({ input }) => {
    return (
      <TextField
        {...input}
        type="text"
        autoFocus
        onKeyUp={enterKeyPress}
        variant="outlined"
        label="Username"
        color="primary"
        className={classes.root}
        autoComplete="off"
      />
    );
  };

  return (
    <div className={styles.LoginForm}>
      <img src={skull} alt="skull icon" className={styles.skull} />
      <h1>Tortugack Online Board Game</h1>
      <div className={styles.content}>
        <Field name="username" component={renderInput} />
        <Button variant="contained" color="primary" onClick={login}>
          login
        </Button>
        <a
          href="https://drive.google.com/file/d/1ZGTgv-DnrvkOPpo4QPzqe13VMsWhH51b/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className={classes.howToPlayButton} variant="contained" color="default">
            Don't know how to play?
          </Button>
        </a>
      </div>
    </div>
  );
}

const wrappedForm = reduxForm({ form: 'loginForm' })(LoginForm);
export default connect(null, { login })(wrappedForm);
