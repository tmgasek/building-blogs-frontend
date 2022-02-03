import React from 'react';
import { useParams } from 'react-router';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Flex,
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
      <Text mb={4}>Posts:</Text>
      <Stack divider={<StackDivider />}>
        {user.blogs.map((blog) => (
          <Flex key={blog.id} justify={'space-between'} align={'center'}>
            <Link as={ReactLink} to={`/blogs/${blog.slug}`}>
              <Text fontSize={'xl'}>{blog.title}</Text>
            </Link>
          </Flex>
        ))}
      </Stack>
    </Box>
  );
};

export default User;
