import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/currUser';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import BlogForm from './BlogForm';
import Blogs from './Blogs';

const Home = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUser);

  const logOut = () => {
    dispatch(logoutUser());
    console.log('logged out');
  };

  return currUser === null ? (
    <>
      <SignupForm />
      <LoginForm />
    </>
  ) : (
    <div>
      <p>{currUser.name} logged in</p>
      <button id="logOutBtn" onClick={logOut}>
        log out
      </button>
      <BlogForm />
      <Blogs />
    </div>
  );
};

export default Home;
