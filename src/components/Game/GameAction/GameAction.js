import React from 'react';
import styles from './GameAction.module.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    margin: '2px',
  },
});

function GameAction(props) {
  const classes = useStyles();

  const output = props.data.playerGameInfo.availableActions.map(
    (action, index) => {
      let click = () => props.sendAction(action);
      if (action === 'put chest') click = props.putChestHandler;
      if (action === 'maroon any crew mate to tortuga')
        click = props.maroonHandler;
      if (action === 'move') click = props.moveHandler;
      if (action === 'move treasure') click = props.moveChestHandler;
      if (action === 'vote') {
        click = props.showModal;
        props.setVoteClickable(true);
      }

      return (
        <Button
          variant="outlined"
          size="small"
          onClick={click}
          key={index}
          classes={classes}
        >
          {action}
        </Button>
      );
    }
  );

  let voteBtn = (
    <Button
      variant="outlined"
      size="small"
      onClick={props.showModal}
      classes={classes}
    >
      vote cards
    </Button>
  );
  if (
    props.data.playerGameInfo.availableActions.some(action => action === 'vote')
  ) {
    voteBtn = null;
  } else {
    props.setVoteClickable(false);
  }

  return (
    <div className={styles.GameAction}>
      {output}
      {voteBtn}
    </div>
  );
}

export default GameAction;
