import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import styles from './MainMenu.module.css';
import { checkUserState, handleModal, createLobby } from '../../actions';
import { deleteToken } from '../../helpers/cookie-helper';
import JoinLobbyModal from '../UI/modal-contents/JoinLobbyModal';

class MainMenu extends React.Component {
  componentDidMount() {
    this.props.checkUserState();
  }

  renderButton = ({ text, color = 'primary' }, onClick) => {
    return (
      <Button variant="outlined" color={color} onClick={onClick}>
        {text}
      </Button>
    );
  };

  render() {
    return (
      <div className={styles.MainMenu}>
        <div className={styles.Content}>
          <p>Welcome {this.props.username}</p>
          {this.renderButton({ text: 'lobbies' }, () =>
            this.props.history.push('/lobbies')
          )}
          {this.renderButton({ text: 'join by id' }, () =>
            this.props.handleModal(true, <JoinLobbyModal />)
          )}
          {this.renderButton({ text: 'create lobby' }, () => {
            this.props.createLobby();
          })}
          {this.renderButton({ text: 'sign out', color: 'secondary' }, () => {
            deleteToken();
            this.props.history.push('/login');
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { username: state.user.username };
};

const actions = { checkUserState, handleModal, createLobby };

export default connect(mapStateToProps, actions)(MainMenu);
