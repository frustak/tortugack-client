import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { hideModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';
import franceIcon from '../../../assets/icons/france-flag.png';
import britainIcon from '../../../assets/icons/britain-flag.png';

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

function MoveChestModal({ data, username, doGameAction, hideModal }) {
  const classes = useStyles();

  const filterOptions = () => {
    const options = [];
    if (data.playersPosition[username].startsWith('jr')) {
      if (data.chestsPosition.jr_en > 0) {
        if (!options.some(button => button === 'BRITAIN')) options.push('BRITAIN');
      }
      if (data.chestsPosition.jr_fr > 0) {
        if (!options.some(button => button === 'FRANCE')) options.push('FRANCE');
      }
    } else {
      if (data.chestsPosition.fd_en > 0) {
        if (!options.some(button => button === 'BRITAIN')) options.push('BRITAIN');
      }
      if (data.chestsPosition.fd_fr > 0) {
        if (!options.some(button => button === 'FRANCE')) options.push('FRANCE');
      }
    }
    return options;
  };

  const renderOptions = () => {
    return filterOptions().map((button, index) => (
      <Button
        key={index}
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => {
          doGameAction('move treasure', { fromHold: button });
          hideModal();
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
  };

  return (
    <Paper className={classes.paper}>
      <p>Which team do you want to take a treasure chest from?</p>
      <div className={classes.row}>{renderOptions()}</div>
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
  doGameAction,
  hideModal,
})(MoveChestModal);
