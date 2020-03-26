import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import styles from './MainModal.module.css';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function MainModal(props) {
  const classes = useStyles();

  return (
    <div>
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
          <div className={styles.MainModal}>{props.children}</div>
        </Fade>
      </Modal>
    </div>
  );
}

export default MainModal;
