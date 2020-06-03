import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { joinLobby, handleModal } from '../../../actions';

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

function JoinLobbyModal({ joinLobby, handleModal }) {
  const [input, setInput] = useState('');
  const classes = useStyles();

  const inputHandler = event => {
    setInput(event.target.value);
  };
  const enterKeyHandler = event => {
    if (event.key !== 'Enter') return;
    joinHandler();
  };
  const joinHandler = () => {
    joinLobby(input);
    handleModal(false);
  };

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

export default connect(null, { joinLobby, handleModal })(JoinLobbyModal);
