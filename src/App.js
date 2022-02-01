import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { initBlogs } from './reducers/blogReducer';
import { loadUser } from './reducers/currUser';
import { initUsers } from './reducers/usersReducer';

import {
  User,
  Users,
  Home,
  Notification,
  Layout,
  BlogPage,
} from './components';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(initBlogs());
    dispatch(initUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Layout>
        <Notification />
        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default App;
