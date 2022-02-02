import React from 'react';
import { useParams } from 'react-router';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Heading,
  Link,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

const User = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }

  return (
    <Box>
      <Heading mb={2}>{user.username}</Heading>
      <Text mb={4}>Blogs added:</Text>
      <Stack divider={<StackDivider />}>
        {user.blogs.map((blog) => (
          <Box key={blog.id}>
            <Link as={ReactLink} to={`/blogs/${blog.slug}`}>
              <Text fontSize={'xl'}>{blog.title}</Text>
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default User;
