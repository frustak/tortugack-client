import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { hideModal } from '../../../actions/modalActions/modalActions';
import { doGameAction } from '../../../actions/gameActions/gameActions';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
});

function CardOptionModal({ options, slug, doGameAction, hideModal }) {
  const classes = useStyles();

  const onClick = index => {
    const data = {
      eventCardToUse: slug,
      eventCardOptionIndex: index,
    };
    doGameAction('USE-EVENT-CARD', data);
    hideModal();
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <Button
        key={option}
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={() => onClick(index)}
      >
        {option}
      </Button>
    ));
  };

  if (options.length === 0) {
    hideModal();
    doGameAction('USE-EVENT-CARD', { eventCardToUse: slug });
  }

  return <Paper className={classes.paper}>{renderOptions()}</Paper>;
}

const mapStateToProps = state => {
  return {
    options: state.game.data.gameStatus.lastAction.actionData.options,
    slug: state.game.data.gameStatus.lastAction.actionData.eventCardSlug,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  doGameAction,
})(CardOptionModal);
