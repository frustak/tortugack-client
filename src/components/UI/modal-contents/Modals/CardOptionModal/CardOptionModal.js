import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { handleModal, sendGameAction } from '../../../../../actions';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
});

function CardOptionModal({ options, slug, sendGameAction, handleModal }) {
  const classes = useStyles();

  const clickHandler = index => {
    const data = {
      eventCardToUse: slug,
      eventCardOptionIndex: index,
    };
    sendGameAction('USE-EVENT-CARD', data);
    handleModal(false);
  };

  if (options.length === 0) {
    handleModal(false);
    sendGameAction('USE-EVENT-CARD', { eventCardToUse: slug });
  }

  const output = options.map((option, index) => (
    <Button
      key={option}
      className={classes.btn}
      variant="contained"
      color="primary"
      onClick={() => clickHandler(index)}
    >
      {option}
    </Button>
  ));

  return <Paper className={classes.paper}>{output}</Paper>;
}

const mapStateToProps = state => {
  return {
    options: state.game.data.gameStatus.lastAction.actionData.options,
    slug: state.game.data.gameStatus.lastAction.actionData.eventCardSlug,
  };
};

export default connect(mapStateToProps, {
  handleModal,
  sendGameAction,
})(CardOptionModal);
