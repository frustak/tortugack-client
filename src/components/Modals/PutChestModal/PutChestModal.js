import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper } from '@material-ui/core';

import { hideModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';
import styles from './PutChestModal.module.css';
import britainIcon from '../../../assets/icons/britain-flag.png';
import franceIcon from '../../../assets/icons/france-flag.png';

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
  const [isStealing, setIsStealing] = useState(false);
  const classes = useStyles();
  const payload = {};
  const { lastAction } = props.data;

  if (
    lastAction?.actionType === 'call for an attack' &&
    lastAction?.actionData.whichCaptain.username === props.username &&
    lastAction?.actionData.state === 'success' &&
    lastAction?.actionData.fromOtherShip
  ) {
    setIsStealing(true);
  }

  const renderSteal = () => {
    return (
      <>
        <p className={classes.par}>Which team do you want to steal a chest from?</p>
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
  };

  const renderPut = () => {
    return (
      <Paper className={classes.paper}>
        <p className={classes.par}>Where do you want to put the chest?</p>
        <div className={styles.row}>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={() => {
              payload.whichTeam = 'BRITAIN';
              props.doGameAction('put chest', payload);
              props.hideModal();
            }}
          >
            britain
            <img src={britainIcon} alt="" className={classes.image} />
          </Button>
          <Button
            className={classes.btn}
            variant="contained"
            color="primary"
            onClick={() => {
              payload.whichTeam = 'FRANCE';
              props.doGameAction('put chest', payload);
              props.hideModal();
            }}
          >
            france
            <img src={franceIcon} alt="" className={classes.image} />
          </Button>
        </div>
      </Paper>
    );
  };

  return <div className={classes.row}>{isStealing ? renderSteal() : renderPut()}</div>;
}

const mapStateToProps = state => {
  return {
    data: state.game.data.gameStatus,
    username: state.user.username,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  doGameAction,
})(PutChestModal);
