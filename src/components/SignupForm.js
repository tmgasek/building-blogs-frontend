import React, { useState } from 'react';
import { registerUser } from '../reducers/usersReducer';
import { useDispatch } from 'react-redux';
import Toggleable from './Toggleable';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

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
    <Toggleable buttonLabel="Sign Up">
      <h2>Sign Up</h2>
      <FormControl>
        <FormLabel my={2} htmlFor="username-signup">
          Username
        </FormLabel>
        <Input
          type={'text'}
          id="username-signup"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <FormLabel my={2} htmlFor="name">
          Name
        </FormLabel>
        <Input
          type={'text'}
          id="name"
          placeholder="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <FormLabel my={2} htmlFor="password-signup">
          Password
        </FormLabel>
        <Input
          type={'password'}
          id="password-signup"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button my={5} onClick={(e) => handleSignup(e)}>
          Sign Up
        </Button>
      </FormControl>
    </Toggleable>
  );
};

export default SignupForm;
