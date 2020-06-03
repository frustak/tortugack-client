import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import franceIcon from '../../../../../assets/icons/france-flag.png';
import britainIcon from '../../../../../assets/icons/britain-flag.png';
import { connect } from 'react-redux';
import { sendGameAction, handleModal } from '../../../../../actions';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
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

function MoveChestModal(props) {
  const classes = useStyles();
  const buttons = [];

  if (props.data.playersPosition[props.username].startsWith('jr')) {
    if (props.data.chestsPosition.jr_en > 0) {
      if (!buttons.some(button => button === 'BRITAIN'))
        buttons.push('BRITAIN');
    }
    if (props.data.chestsPosition.jr_fr > 0) {
      if (!buttons.some(button => button === 'FRANCE')) buttons.push('FRANCE');
    }
  } else {
    if (props.data.chestsPosition.fd_en > 0) {
      if (!buttons.some(button => button === 'BRITAIN'))
        buttons.push('BRITAIN');
    }
    if (props.data.chestsPosition.fd_fr > 0) {
      if (!buttons.some(button => button === 'FRANCE')) buttons.push('FRANCE');
    }
  }

  const output = buttons.map((button, index) => (
    <Button
      key={index}
      className={classes.btn}
      variant="contained"
      color="primary"
      onClick={() => {
        props.sendGameAction('move treasure', { fromHold: button });
        props.handleModal(false);
      }}
    >
      {button}
      <img
        src={button === 'BRITAIN' ? britainIcon : franceIcon}
        alt=""
        className={classes.image}
      />
    </Button>
  ));

  return (
    <Paper className={classes.paper}>
      <p>Which team do you want to take a treasure chest from?</p>
      <div className={classes.row}>{output}</div>
    </Paper>
  );
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
})(MoveChestModal);
