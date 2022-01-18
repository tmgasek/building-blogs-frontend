import React, { useState } from 'react';
import { registerUser } from '../reducers/currUser';
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
            id="username"
            type="text"
            value={username}
            name="username"
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
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          ></input>
        </div>
        <button id="submitBtn" type="submit">
          sign up
        </button>
      </form>
    </Toggleable>
  );
};

export default SignupForm;
