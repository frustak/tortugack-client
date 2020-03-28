import React from 'react';
import styles from './VoteCards.module.css';
import Card from '@material-ui/core/Card';
import { Modal, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import cannonIcon from '../../../assets/icons/cannon.png';
import fireIcon from '../../../assets/icons/fire.png';
import waterIcon from '../../../assets/icons/water.png';
import britainIcon from '../../../assets/icons/britain-flag.png';
import franceIcon from '../../../assets/icons/france-flag.png';
import skullIcon from '../../../assets/icons/skull.png';
import wheelIcon from '../../../assets/icons/wheel.png';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    margin: '4px',
    display: 'flex',
    transition: '0.18s ease',
    cursor: 'pointer',
    '&:hover': {
      color: '#eeeeee',
      backgroundColor: '#222222',
      padding: '2px 32px',
    },
  },
  cardNotClickable: {
    margin: '4px',
    display: 'flex',
  },
  img: {
    width: '32px',
    height: '32px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function VoteCards(props) {
  const classes = useStyles();

  const cards = props.data.playerGameInfo.voteCards.map((card, index) => {
    const details = [];

    return (
      <Card
        className={props.clickable ? classes.card : classes.cardNotClickable}
        elevation={0}
        onClick={props.clickable ? () => props.vote(index + 1) : null}
        key={index}
      >
        <div className={styles.col}>
          <span className={classes.row}>
            <img className={classes.img} src={cannonIcon} alt="" />
            <span>Cannon</span>
            <span>{card.cannon}</span>
          </span>
          <span className={classes.row}>
            <img className={classes.img} src={fireIcon} alt="" />
            <span>Fire</span>
            <span>{card.fire}</span>
          </span>
          <span className={classes.row}>
            <img className={classes.img} src={waterIcon} alt="" />
            <span>Water</span>
            <span>{card.water}</span>
          </span>
          <span className={classes.row}>
            <img className={classes.img} src={britainIcon} alt="" />
            <span>Britain</span>
            <span>{card.britain}</span>
          </span>
          <span className={classes.row}>
            <img className={classes.img} src={franceIcon} alt="" />
            <span>France</span>
            <span>{card.france}</span>
          </span>
          <span className={classes.row}>
            <img className={classes.img} src={skullIcon} alt="" />
            <span>Skull</span>
            <span>{card.skull}</span>
          </span>
          <span className={classes.row}>
            <img className={classes.img} src={wheelIcon} alt="" />
            <span>Wheel</span>
            <span>{card.wheel}</span>
          </span>
        </div>
        {details}
      </Card>
    );
  });

  return (
    <Modal
      className={classes.modal}
      open={props.show}
      onClose={props.close}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
      }}
    >
      <Fade in={props.show}>
        <div className={styles.VoteCards}>{cards}</div>
      </Fade>
    </Modal>
  );
}

export default VoteCards;
