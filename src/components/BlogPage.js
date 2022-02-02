import React, { useState } from 'react';
import { useParams, useNavigate, Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import { MdThumbUpOffAlt } from 'react-icons/md';

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
          <Heading>{blog.title}</Heading>
          <Text as={'i'} fontSize={'sm'}>
            by {blog.author}
          </Text>
        </Box>

        <Flex align={'center'} gap={2}>
          {currUser && (
            <Button onClick={() => handleLike(blog)}>
              <MdThumbUpOffAlt />
            </Button>
          )}
          <Text fontSize={'2xl'} fontWeight={'semibold'}>
            {blog.likes}{' '}
          </Text>
        </Flex>
      </Flex>
      <Divider />

      <Box>
        <Link href={blog.url} isExternal>
          <Button
            size={'lg'}
            mt={4}
            w={'full'}
            colorScheme={'green'}
            letterSpacing={'wider'}
          >
            GO TO BLOG
          </Button>
        </Link>
      </Box>
      <Flex fontSize={'sm'} color={'gray.500'} gap={1}>
        <Text>Posted by</Text>
        <Link as={ReactLink} to={`/users/${blog.user.id}`}>
          {blog.user.username}
        </Link>
      </Flex>

      <Text my={4}>{blog.description}</Text>
      <Divider my={4} />

      <Comments blog={blog} />
      <Flex alignItems={'end'} justify={'space-between'} mt={10}>
        <Box></Box>
        {currUser?.username === blog.user.username && (
          <Button
            textAlign={'right'}
            onClick={() => handleDelete(blog)}
            colorScheme={'red'}
          >
            Delete blog
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Blog;
