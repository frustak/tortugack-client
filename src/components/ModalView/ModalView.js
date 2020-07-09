import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { hideModal } from '../../actions/modalActions/modalActions';
import styles from './ModalView.module.css';
import renderModalContent from './renderModalContent';

const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function ModalView({ isOpen, type, data, hideModal }) {
  const classes = useStyles();

  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={() => hideModal()}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
      >
        <Fade in={isOpen}>
          <div className={styles.mainModal}>{renderModalContent(type, data)}</div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isOpen: state.modal.isOpen,
    type: state.modal.type,
    data: state.modal.data,
  };
};

export default connect(mapStateToProps, { hideModal })(ModalView);
