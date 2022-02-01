import React, { useRef, useState } from 'react';
import { loginUser } from '../reducers/currUser';
import { useDispatch } from 'react-redux';
import Toggleable from './Toggleable';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from '@chakra-ui/react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginFormRef = useRef();

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(
      loginUser({
        username,
        password,
      })
    );
    setUsername('');
    setUsername('');
    setPassword('');
    loginFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="Login" ref={loginFormRef}>
      <FormControl isRequired>
        <FormLabel my={2} htmlFor="username-login">
          Username
        </FormLabel>
        <Input
          type={'text'}
          id="username-login"
          placeholder="Username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <FormLabel my={2} htmlFor="password-login">
          Password
        </FormLabel>
        <Input
          type={'password'}
          id="password-login"
          placeholder="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button my={5} onClick={(e) => handleLogin(e)}>
          Log In
        </Button>
      </FormControl>
    </Toggleable>
  );
};

export default LoginForm;
