import React, { useState } from 'react';
import { Button, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import styles from './PutChestModal.module.css';
import franceIcon from '../../../assets/icons/france-flag.png';
import britainIcon from '../../../assets/icons/britain-flag.png';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
  par: {
    margin: '0 0 8px 0',
    fontSize: 'large',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  image: {
    width: '32px',
    height: '32px',
    marginLeft: '8px',
  },
});

function PutChestModal(props) {
  const classes = useStyles();
  let output;
  const lastAction = props.data.lastAction;
  const [isStealing, setIsStealing] = useState(false);
  const payload = {};

  if (
    lastAction?.actionType === 'call for an attack' &&
    lastAction?.actionData.whichCaptain.username === props.username &&
    lastAction?.actionData.state === 'success' &&
    lastAction?.actionData.fromOtherShip
  ) {
    setIsStealing(true);
  }

  if (isStealing) {
    output = (
      <>
        <p className={classes.par}>
          Which team do you want to steal a chest from?
        </p>
        <Button
          classes={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => {
            payload.fromWhichTeam = 'BRITAIN';
            setIsStealing(false);
          }}
        >
          britain
          <img src={britainIcon} alt="" className={classes.image} />
        </Button>
        <Button
          classes={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => {
            payload.fromWhichTeam = 'FRANCE';
            setIsStealing(false);
          }}
        >
          france
          <img src={franceIcon} alt="" className={classes.image} />
        </Button>
      </>
    );
  } else {
    output = (
      <Paper className={classes.paper}>
        <p className={classes.par}>Where do you want to put the chest?</p>
        <div className={styles.row}>
          <Button
            classes={classes.btn}
            variant="contained"
            color="primary"
            onClick={() => {
              payload.whichTeam = 'BRITAIN';
              props.sendAction('put chest', payload);
              props.close();
            }}
          >
            britain
            <img src={britainIcon} alt="" className={classes.image} />
          </Button>
          <Button
            classes={classes.btn}
            variant="contained"
            color="primary"
            onClick={() => {
              payload.whichTeam = 'FRANCE';
              props.sendAction('put chest', payload);
              props.close();
            }}
          >
            france
            <img src={franceIcon} alt="" className={classes.image} />
          </Button>
        </div>
      </Paper>
    );
  }

  return <div className={classes.row}>{output}</div>;
}

export default PutChestModal;
