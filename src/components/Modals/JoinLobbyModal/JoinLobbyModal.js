import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { joinLobby } from '../../../actions/lobbyActions/lobbyActions';
import { hideModal } from '../../../actions/modalActions/modalActions';

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

function JoinLobbyModal({ joinLobby, hideModal }) {
  const [input, setInput] = useState('');
  const classes = useStyles();

  const onInputChange = e => {
    setInput(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    joinLobby(input);
    hideModal();
  };

  return (
    <form onSubmit={onSubmit}>
      <Paper className={classes.paper}>
        <TextField
          type="text"
          autoFocus
          onChange={onInputChange}
          variant="filled"
          label="Lobby ID"
          color="primary"
          className={classes.m}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          className={classes.m}
        >
          join
        </Button>
      </Paper>
    </form>
  );
}

export default connect(null, {
  joinLobby,
  hideModal,
})(JoinLobbyModal);
