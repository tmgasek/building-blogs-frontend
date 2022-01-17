import React from 'react';

const Blog = ({ blog }) => {
  return (
    <div style={{ margin: 10 }}>
      <div>{blog.title} </div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      {blog.user && <div>{blog.user.name}</div>}
    </div>
  );
};

export default Blog;
