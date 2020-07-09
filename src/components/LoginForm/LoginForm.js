import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { loginUser } from '../../actions/userActions/userActions';
import styles from './LoginForm.module.css';
import skull from '../../assets/skull.png';

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

function LoginForm({ loginUser }) {
  const [input, setInput] = useState('');
  const classes = useStyles();

  const onSubmit = e => {
    e.preventDefault();
    if (input) loginUser(input);
  };

  return (
    <div className={styles.loginForm}>
      <img src={skull} alt="skull icon" className={styles.skull} />
      <h1>Tortugack Online Board Game</h1>
      <form className={styles.content} onSubmit={onSubmit}>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          type="text"
          autoFocus
          variant="outlined"
          label="Username"
          color="primary"
          className={classes.root}
          autoComplete="off"
        />
        <Button variant="contained" color="primary" type="submit">
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
      </form>
    </div>
  );
}

export default connect(null, { loginUser })(LoginForm);
