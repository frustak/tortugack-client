import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';

import styles from './ModalView.module.css';
import { handleModal } from '../../actions';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ModalView({ isOpen, handleModal, content }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={() => handleModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={isOpen}>
          <div className={styles.MainModal}>{content}</div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return { isOpen: state.modal.isOpen, content: state.modal.content };
};

export default connect(mapStateToProps, { handleModal })(ModalView);
