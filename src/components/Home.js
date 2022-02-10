import { useSelector } from 'react-redux';
import { SignupForm, LoginForm, BlogForm, Blogs, GuestLogin } from './index';

const Home = () => {
  const currUser = useSelector((state) => state.currUser);

  if (currUser === null) {
    return (
      <>
        <GuestLogin />
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
