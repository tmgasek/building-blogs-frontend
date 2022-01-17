import React, { useEffect, useState } from 'react';
import Blog from './components/Blog';
import blogServices from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogServices.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  console.log(blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <div style={{ margin: 10 }}>
          <div>{blog.content} </div>
          <div>{blog.date}</div>
        </div>
      ))}
    </div>
  );
};

export default App;
