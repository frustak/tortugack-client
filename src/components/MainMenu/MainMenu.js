import React from 'react';

function MainMenu(props) {
  return (
    <>
      <p>welcome {props.username}</p>
      <button onClick={props.showLobbies}>lobbies</button>
      <button onClick={props.joinLobby}>join by id</button>
      <button onClick={props.createLobby}>create game</button>
      <button onClick={props.logout}>sign out</button>
    </>
  );
}

export default MainMenu;
