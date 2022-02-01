import React from 'react';
import { useSelector } from 'react-redux';
import { SignupForm, LoginForm, BlogForm, Blogs } from './index';

const Home = () => {
  const currUser = useSelector((state) => state.currUser);

  if (currUser === null) {
    return (
      <>
        <SignupForm />
        <LoginForm />
      </>
    );
  }

  return (
    <div>
      <p>Hello {currUser.name}</p>

      <BlogForm />
      <Blogs />
    </div>
  );
};

export default Home;
