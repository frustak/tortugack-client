import React from 'react';
import styles from './VoteCards.module.css';
import Card from '@material-ui/core/Card';
import { Modal, Fade, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
      >
        <div className={styles.col}>
          <span>Cannon</span>
          <span>Fire</span>
          <span>Water</span>
          <span>Britain</span>
          <span>France</span>
          <span>Skull</span>
          <span>Wheel</span>
        </div>
        <div className={styles.col}>
          <span>{card.cannon}</span>
          <span>{card.fire}</span>
          <span>{card.water}</span>
          <span>{card.britain}</span>
          <span>{card.france}</span>
          <span>{card.skull}</span>
          <span>{card.wheel}</span>
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
