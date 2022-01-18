import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { initBlogs } from './reducers/blogReducer';
import { loadUser } from './reducers/currUser';
import { initUsers } from './reducers/usersReducer';

import Notification from './components/Notification';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';
import Home from './components/Home';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">home</Link>
          <br></br>
          <Link to="/users">users</Link>
        </nav>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
