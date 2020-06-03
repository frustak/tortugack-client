import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  paper: {
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
  },
  m: {
    margin: '4px',
  },
});

function JoinLobbyModal(props) {
  const [input, setInput] = useState('');
  const classes = useStyles();

  function inputHandler(event) {
    setInput(event.target.value);
  }
  function enterKeyHandler(event) {
    if (event.key !== 'Enter') return;
    props.join(input);
    props.close();
  }
  function joinHandler() {
    props.join(input);
    props.close();
  }

  return (
    <Paper className={classes.paper}>
      <TextField
        type="text"
        autoFocus
        onChange={inputHandler}
        onKeyUp={enterKeyHandler}
        variant="filled"
        label="Lobby ID"
        color="primary"
        className={classes.m}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={joinHandler}
        className={classes.m}
      >
        join
      </Button>
    </Paper>
  );
}

export default JoinLobbyModal;
