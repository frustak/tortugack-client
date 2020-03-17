import React from 'react';

function SignIn(props) {
  return (
    <>
      <input
        type="text"
        placeholder="username"
        onChange={props.usernameHandler}
      />
      <button onClick={props.login}>login</button>
    </>
  );
}

export default SignIn;
