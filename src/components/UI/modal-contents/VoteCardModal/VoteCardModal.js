import React from 'react';
import styles from './VoteCardModal.module.css';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import cannonIcon from '../../../../assets/icons/cannon.png';
import fireIcon from '../../../../assets/icons/fire.png';
import waterIcon from '../../../../assets/icons/water.png';
import britainIcon from '../../../../assets/icons/britain-flag.png';
import franceIcon from '../../../../assets/icons/france-flag.png';
import skullIcon from '../../../../assets/icons/skull.png';
import wheelIcon from '../../../../assets/icons/wheel.png';
import { sendGameAction, handleModal } from '../../../../actions';

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

function VoteCards({ data, sendGameAction, clickable, handleModal }) {
  const classes = useStyles();

  const cards = data.playerGameInfo.voteCards.map((card, index) => {
    const details = [];

    return (
      <Card
        className={clickable ? classes.card : classes.cardNotClickable}
        elevation={0}
        onClick={
          clickable
            ? () => {
                sendGameAction('vote', { voteCardIndex: index });
                handleModal(false);
              }
            : null
        }
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

  return <div className={styles.VoteCardModal}>{cards}</div>;
}

const mapStateToProps = state => {
  return {
    data: state.game.data.gameStatus,
    username: state.user.username,
  };
};

export default connect(mapStateToProps, {
  sendGameAction,
  handleModal,
})(VoteCards);
