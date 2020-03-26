import React from 'react';
import Paper from '@material-ui/core/Paper';
import styles from './Lobby.module.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    borderRadius: '0 0 4px 4px',
  },
});

function Lobby(props) {
  const data = props.data;
  const players = data.players.map((player, index) => {
    if (data.players.length - 1 === index) return `${player.username}`;
    return `${player.username}, `;
  });

  const btnClasses = useStyles();
  let output = null;
  if (props.showBtn)
    output = (
      <Button
        variant="outlined"
        color="primary"
        size="small"
        classes={btnClasses}
        onClick={() => props.joinLobby(data.id)}
      >
        join
      </Button>
    );

  return (
    <Paper className={styles.m}>
      <div className={styles.Lobby}>
        <div className={styles.row}>
          <div className={styles.colBorder}>
            <span>Lobby ID</span>
            <span>Size</span>
            <span>Occupied</span>
            <span>Host</span>
            <span>Game Status</span>
            <span>Players</span>
          </div>
          <div className={styles.col}>
            <span>{data.id}</span>
            <span>{data.size}</span>
            <span>{data.occupy}</span>
            <span>{data.host.username}</span>
            <span>{data.gameStarted ? 'in game' : 'in lobby'}</span>
            <span>
              <div className={styles.Players}>{players}</div>
            </span>
          </div>
        </div>
      </div>
      {output}
    </Paper>
  );
}

export default Lobby;
