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

  console.log(user.blogs);

  return (
    <Box>
      <Heading mb={4}>{user.username}</Heading>
      <Text mb={4}>Blogs added:</Text>
      <Stack divider={<StackDivider />}>
        {user.blogs.map((blog) => (
          <Box key={blog.id}>
            <Text>{blog.title}</Text>
            <Link as={ReactLink} to={`/blogs/${blog.slug}`}>
              Go to...
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default User;
// <div>
//   <h2>{user.name}</h2>
//   <h3>added blogs</h3>
//   <ul>
//     {user.blogs.map((blog) => (
//       <li key={blog.id}>{blog.title}</li>
//     ))}
//   </ul>
// </div>
