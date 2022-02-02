import React from 'react';
import { useSelector } from 'react-redux';
import { SignupForm, LoginForm, BlogForm, Blogs } from './index';

const Home = () => {
  const currUser = useSelector((state) => state.currUser);

  if (currUser === null) {
    return (
      <>
        <LoginForm />
        <SignupForm />
      </>
    );
  }

  return (
    <>
      <BlogForm />
      <Blogs />
    </>
  );
};

export default Home;
