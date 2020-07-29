import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FaGithub } from 'react-icons/fa';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { loginUser } from '../../actions/userActions/userActions';
import styles from './LoginForm.module.css';
import skull from '../../assets/skull.png';

const useStyles = makeStyles({
  root: {
    marginBottom: '8px',
  },
  howToPlayButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    width: '100%',
    '&:hover': {
      backgroundColor: '#388E3C',
    },
  },
  anchor: {
    marginTop: '8px',
    marginBottom: '8px',
  },
  github: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '8px',
  },
  githubIcon: {
    fontSize: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    color: '#222222',
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
          className={classes.anchor}
        >
          <Button className={classes.howToPlayButton} variant="contained" color="default">
            Don't know how to play?
          </Button>
        </a>
        <div className={classes.github}>
          <Tooltip title="Client">
            <a
              href="https://github.com/Frostack/tortugack-client"
              alt="api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <FaGithub className={classes.githubIcon} />
              </IconButton>
            </a>
          </Tooltip>
          <Tooltip title="API">
            <a
              href="https://github.com/Frostack/tortugack-client"
              alt="api"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton>
                <FaGithub className={classes.githubIcon} />
              </IconButton>
            </a>
          </Tooltip>
        </div>
      </form>
    </div>
  );
}

export default connect(null, { loginUser })(LoginForm);
