import React, { useState } from 'react';
import { registerUser } from '../reducers/usersReducer';
import { useDispatch } from 'react-redux';
import Toggleable from './Toggleable';

const SignupForm = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSignup = async (event) => {
    event.preventDefault();
    dispatch(
      registerUser({
        username,
        name,
        password,
      })
    );
    setUsername('');
    setPassword('');
  };

  return (
    <Toggleable buttonLabel="signup">
      <form onSubmit={handleSignup}>
        <div>
          username
          <input
            id="usernameSignup"
            type="text"
            value={username}
            name="usernameSignup"
            onChange={({ target }) => setUsername(target.value)}
          ></input>
        </div>
        <div>
          name
          <input
            id="name"
            type="text"
            value={name}
            name="name"
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>
        <div>
          password
          <input
            id="passwordSignup"
            type="password"
            value={password}
            name="passwordSignup"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button id="registerBtn" type="submit">
          sign up
        </button>
      </form>
    </Toggleable>
  );
};

export default SignupForm;
