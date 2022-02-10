import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormControl, FormErrorMessage, Input, Button } from '@chakra-ui/react';
import Toggleable from './Toggleable';
import { registerUser } from '../reducers/usersReducer';

const SignupForm = () => {
  const dispatch = useDispatch();
  const signUpFormRef = useRef();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleSignup = async ({ username, name, password }) => {
    dispatch(
      registerUser({
        username,
        name,
        password,
      })
    );
    signUpFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="Sign Up" ref={signUpFormRef}>
      <form onSubmit={handleSubmit(handleSignup)}>
        <FormControl isInvalid={errors.username} mb={4}>
          <Input
            id="username-signup"
            placeholder="username"
            {...register('username', {
              required: 'Username required',
              minLength: { value: 3, message: 'Minimum length should be 3' },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.name} mb={4}>
          <Input
            id="name"
            placeholder="name"
            {...register('name', {
              required: 'name required',
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mb={4}>
          <Input
            id="password-signup"
            type={'password'}
            placeholder="password"
            {...register('password', {
              required: 'Password required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          w={'full'}
          mb={2}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Sign Up
        </Button>
      </form>
    </Toggleable>
  );
};

export default SignupForm;
