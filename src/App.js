import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogServices from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  console.log(blogs);

  return <div></div>;
};

export default App;
