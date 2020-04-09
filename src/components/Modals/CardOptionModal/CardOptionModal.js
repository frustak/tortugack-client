import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    margin: '2px',
  },
  paper: {
    padding: '8px',
  },
});

function CardOptionModal({ options, slug, sendAction, close }) {
  const classes = useStyles();

  const clickHandler = index => {
    const data = {
      eventCardToUse: slug,
      eventCardOptionIndex: index,
    };
    sendAction('USE-EVENT-CARD', data);
    close();
  };

  const output = options.map((option, index) => (
    <Button
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

export default CardOptionModal;
