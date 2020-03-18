import React from 'react';

function SignIn(props) {
  const enterKeyPress = event => {
    if (event.key === 'Enter') props.login();
  };

  return (
    <>
      <input
        type="text"
        placeholder="username"
        autoFocus
        onChange={props.usernameHandler}
        onKeyUp={enterKeyPress}
      />
      <button onClick={props.login}>login</button>
    </>
  );
}

export default SignIn;
