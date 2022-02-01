import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import Comments from './Comments';

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slug = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);
  const blog = blogs.find((blog) => blog.slug === slug);

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    if (
      window.confirm(`do you want to delete ${blog.title} by ${blog.author}?`)
    ) {
      navigate('/');
      dispatch(deleteBlog(blog));
    }
  };

  if (!blog) {
    return <div>NO BLOG FOUND</div>;
  }

  return (
    <Box>
      <Flex justify={'space-between'} align={'center'}>
        <Box>
          <Heading mb={2}>{blog.title}</Heading>
          <Text>by {blog.author}</Text>
        </Box>

        <Box>
          <Box>{blog.likes} likes</Box>
          {currUser && (
            <Button my={2} onClick={() => handleLike(blog)}>
              Like
            </Button>
          )}
        </Box>
      </Flex>

      <Box my={4}>
        <Link href={blog.url} isExternal>
          <Button
            size={'lg'}
            w={'full'}
            bgColor={'green.700'}
            letterSpacing={'wider'}
          >
            GO TO BLOG
          </Button>
        </Link>
      </Box>
      <Text>Posted by: {blog.user.username}</Text>

      <Text mt={4}>{blog.description}</Text>

      {currUser?.username === blog.user.username && (
        <Button textAlign={'right'} onClick={() => handleDelete(blog)}>
          Delete
        </Button>
      )}
      <Comments blog={blog} />
    </Box>
  );
};

export default Blog;

// <div>
//   <div>
//     {blog.title} by {blog.author}
//   </div>
//   <div>
//     <div> {blog.url}</div>
//     <div>op: {blog.user.name} </div>
//     <div id="likes">{blog.likes} likes</div>
//     <button id="likeBtn" onClick={() => handleLike(blog)}>
//       like
//     </button>
//     {currUser.name === blog.user.name && (
//       <button id="deleteBtn" onClick={() => handleDelete(blog)}>
//         delete
//       </button>
//     )}
//     <form onSubmit={handleCommentClick}>
//       <input
//         value={comment}
//         onChange={({ target }) => setComment(target.value)}
//       />
//       <button type="submit">add comment</button>
//     </form>
//     <div>
//       <h2>comments</h2>
//       {blog.comments.map((c) => (
//         <div key={c}>{c}</div>
//       ))}
//     </div>
//   </div>
// </div>
